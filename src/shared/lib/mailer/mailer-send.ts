import Mail from "nodemailer/lib/mailer";

import { transporter } from "./mailer-transporter";

export function mailerSend(options: Mail.Options) {
  return transporter.sendMail(options);
}
