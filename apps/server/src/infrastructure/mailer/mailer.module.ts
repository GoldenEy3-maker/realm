import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule as NestMailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/adapters/handlebars.adapter";
import { I18nService } from "nestjs-i18n";
import path from "path";

import { Environment } from "@/env.validation";

import { MailerService } from "./mailer.service";

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService, i18nService: I18nService) => {
        const port = configService.get<number>("MAIL_PORT");
        const secure = configService.get<boolean>("MAIL_SECURE", false);

        return {
          transport: {
            host: configService.get<string>("MAIL_HOST"),
            port,
            secure,
            auth: {
              user: configService.get<string>("MAIL_USER"),
              pass: configService.get<string>("MAIL_PASSWORD"),
            },
            ...(port === 587 && !secure && { requireTLS: true }),
            tls: {
              rejectUnauthorized:
                configService.get<Environment>("NODE_ENV") === Environment.Production,
            },
          },
          defaults: {
            from: configService.get<string>("MAIL_FROM"),
          },
          template: {
            dir: path.join(__dirname, "templates"),
            adapter: new HandlebarsAdapter({ t: i18nService.hbsHelper }),
          },
        };
      },
      inject: [ConfigService, I18nService],
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
