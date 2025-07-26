import { createServerFn } from "@tanstack/react-start";

import { RedisKeyMap } from "@/shared/constants/redis-key-map";
import { redis } from "@/shared/db";
import { serverEnv } from "@/shared/env/server";
import { Exception } from "@/shared/lib/exception";
import { getRandomInt } from "@/shared/lib/get-random-int";
import { mailerSend } from "@/shared/lib/mailer";

import { authCodeConfig } from "../config/auth-code-config";
import { AUTH_CODE_EXPIRATION_TIME } from "../config/auth-code-expiration";
import { generateAuthCodeToken } from "../lib/generate-auth-code-token";
import { setAuthCodeCookie } from "../lib/set-auth-code-cookie";
import { authEmailFormSchema } from "../model/auth-email-form-schema";

export const authSendEmailCodeServerFn = createServerFn({ method: "POST" })
  .validator(authEmailFormSchema)
  .handler(async ({ data }) => {
    try {
      const code = getRandomInt(100000, 999999);
      const text = `Ваш код для авторизации - ${code}`;

      await redis.connect();

      await redis.hSetEx(
        RedisKeyMap.AUTH_CODE,
        {
          [data.email]: code,
        },
        {
          expiration: {
            type: "EX",
            value: AUTH_CODE_EXPIRATION_TIME,
          },
        },
      );

      await redis.close();

      const mailerResponse = await mailerSend({
        from: serverEnv.MAILER_FROM,
        to: data.email,
        subject: "Авторизация на платформу Realm",
        text,
      });

      const token = await generateAuthCodeToken(data.email, authCodeConfig);

      setAuthCodeCookie(token, authCodeConfig);

      return mailerResponse;
    } catch (error) {
      if (error instanceof Error) throw Exception.badRequest(error.message);

      throw Exception.internalServerError("Неизвестная ошибка!");
    }
  });
