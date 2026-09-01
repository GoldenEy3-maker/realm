import { Test, TestingModule } from "@nestjs/testing";
import { MailerService } from "./mailer.service";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { I18nService } from "nestjs-i18n";

describe("MailerService", () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: NestMailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: I18nService,
          useValue: {
            t: jest.fn((key: string) => key),
          },
        },
      ],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
