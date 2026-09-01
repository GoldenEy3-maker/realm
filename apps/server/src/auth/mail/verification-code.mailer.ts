import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";

import { MailerService } from "@/infrastructure/mailer/mailer.service";

@Injectable()
export class VerificationCodeMailer {
  constructor(
    private readonly mailerService: MailerService,
    private readonly i18n: I18nService,
  ) {}

  async send(email: string, code: string): Promise<void> {
    try {
      await this.mailerService.send({
        to: email,
        subject: this.i18n.t("auth.verificationEmail.subject"),
        template: "verification-code",
        context: {
          code,
          emailVerification: this.i18n.t("auth.verificationEmail.title"),
          verificationCodeText: this.i18n.t("auth.verificationEmail.codeText"),
          codeExpiration: this.i18n.t("auth.verificationEmail.codeExpiration"),
          ignoreIfNotRequested: this.i18n.t("auth.verificationEmail.ignoreIfNotRequested"),
        },
      });
    } catch (error) {
      throw new Error(this.i18n.t("auth.verificationEmail.failedToSend"), { cause: error });
    }
  }
}
