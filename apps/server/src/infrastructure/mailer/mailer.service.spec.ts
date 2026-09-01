import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";

import { MailerService } from "./mailer.service";

describe("MailerService", () => {
  let service: MailerService;
  let nestMailerService: { sendMail: jest.Mock };

  beforeEach(async () => {
    nestMailerService = {
      sendMail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: NestMailerService,
          useValue: nestMailerService,
        },
      ],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it("sends mail through the transport", async () => {
    const mail = {
      to: "user@example.com",
      subject: "Hello",
      template: "welcome",
      context: { name: "User" },
    };

    await service.send(mail);

    expect(nestMailerService.sendMail).toHaveBeenCalledWith(mail);
  });

  it("rethrows transport errors", async () => {
    nestMailerService.sendMail.mockRejectedValue(new Error("SMTP down"));

    await expect(
      service.send({
        to: "user@example.com",
        subject: "Hello",
        template: "welcome",
        context: {},
      }),
    ).rejects.toThrow("SMTP down");
  });
});
