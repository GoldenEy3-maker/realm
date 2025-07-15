import { createServerFn } from "@tanstack/react-start";

import { serverEnv } from "@/shared/env/server";
import { mailerSend } from "@/shared/lib/mailer";

import { authEmailFormSchema } from "../model/auth-email-form-schema";

export const authSendEmailCodeServerFn = createServerFn({ method: "POST" })
  .validator(authEmailFormSchema)
  .handler(({ data }) => {
    return mailerSend({
      from: serverEnv.MAILER_FROM,
      to: data.email,
      subject: "Авторизация на платформу Realm",
      text: "<b>Hello</b>",
    });
  });
