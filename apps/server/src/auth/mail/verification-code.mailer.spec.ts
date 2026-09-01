import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { I18nService } from "nestjs-i18n";

import { MailerService } from "@/infrastructure/mailer/mailer.service";

import { VerificationCodeMailer } from "./verification-code.mailer";

describe("VerificationCodeMailer", () => {
  let mailer: VerificationCodeMailer;
  let mailerService: { send: jest.Mock };

  beforeEach(async () => {
    mailerService = {
      send: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerificationCodeMailer,
        {
          provide: MailerService,
          useValue: mailerService,
        },
        {
          provide: I18nService,
          useValue: {
            t: jest.fn((key: string) => key),
          },
        },
      ],
    }).compile();

    mailer = module.get(VerificationCodeMailer);
  });

  it("sends a verification email with translated copy", async () => {
    await mailer.send("user@example.com", "123456");

    expect(mailerService.send).toHaveBeenCalledWith({
      to: "user@example.com",
      subject: "auth.verificationEmail.subject",
      template: "verification-code",
      context: {
        code: "123456",
        emailVerification: "auth.verificationEmail.title",
        verificationCodeText: "auth.verificationEmail.codeText",
        codeExpiration: "auth.verificationEmail.codeExpiration",
        ignoreIfNotRequested: "auth.verificationEmail.ignoreIfNotRequested",
      },
    });
  });

  it("wraps transport errors with a verification-email message", async () => {
    mailerService.send.mockRejectedValue(new Error("SMTP down"));

    await expect(mailer.send("user@example.com", "123456")).rejects.toThrow(
      "auth.verificationEmail.failedToSend",
    );
  });
});
