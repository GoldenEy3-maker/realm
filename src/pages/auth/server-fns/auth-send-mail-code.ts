import { createServerFn } from "@tanstack/react-start";

import { serverEnv } from "@/shared/env/server";
import { mailerSend } from "@/shared/lib/mailer";

import { authFormSchema } from "../model/auth-form-schema";

export const authSendMailCodeServerFn = createServerFn({ method: "POST" })
  .validator(authFormSchema)
  .handler(({ data }) => {
    return mailerSend({
      from: serverEnv.MAILER_FROM,
      to: data.email,
      subject: "Авторизация на платформу Realm",
      text: "<b>Hello</b>",
    });
  });
