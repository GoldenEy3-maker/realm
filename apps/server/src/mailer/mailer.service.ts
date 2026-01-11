import { Injectable, Logger } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
import { I18nService } from "nestjs-i18n";

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  constructor(
    private readonly mailerService: NestMailerService,
    private readonly i18n: I18nService,
  ) {}

  async sendVerificationCode(email: string, code: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: this.i18n.t("mailer.verificationCodeSubject"),
        template: "verification-code",
        context: {
          code,
          emailVerification: this.i18n.t("mailer.emailVerification"),
          verificationCodeText: this.i18n.t("mailer.verificationCodeText"),
          codeExpiration: this.i18n.t("mailer.codeExpiration"),
          ignoreIfNotRequested: this.i18n.t("mailer.ignoreIfNotRequested"),
        },
      });

      this.logger.log(`Verification code sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error);
      throw new Error(this.i18n.t("mailer.failedToSendVerificationEmail"));
    }
  }
}
