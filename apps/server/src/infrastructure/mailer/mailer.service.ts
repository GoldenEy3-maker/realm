import { Injectable, Logger } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";

export interface SendMailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, unknown>;
}

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  constructor(private readonly mailerService: NestMailerService) {}

  async send(mail: SendMailOptions): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: mail.to,
        subject: mail.subject,
        template: mail.template,
        context: mail.context,
      });

      this.logger.log(`Email sent to ${mail.to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${mail.to}`, error);
      throw error;
    }
  }
}
