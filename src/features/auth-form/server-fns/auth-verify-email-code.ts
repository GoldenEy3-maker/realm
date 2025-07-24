import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";

import { RedisKeyMap } from "@/shared/constants/redis-key-map";
import { db, redis } from "@/shared/db";
import { users } from "@/shared/db/schema/users";
import { setSession } from "@/shared/lib/auth/auth-set-session";
import { Exception } from "@/shared/lib/exception";

import { authCodeConfig } from "../config/auth-code-token-config";
import { authFormSchema } from "../model/auth-form-schema";

export const authVerifyEmailCodeServerFn = createServerFn({ method: "POST" })
  .validator(authFormSchema)
  .handler(async ({ data }) => {
    await redis.connect();

    const code = await redis.hGet(RedisKeyMap.AUTH_CODE, data.email);

    await redis.close();

    if (!code) {
      throw Exception.unauthorized("Неверный код!");
    }

    if (code !== data.code) {
      throw Exception.unauthorized("Неверный код!");
    }

    let [user] = await db
      .select({ id: users.id, tokenVersion: users.tokenVersion })
      .from(users)
      .where(eq(users.email, data.email));

    if (!user) {
      const [newUser] = await db
        .insert(users)
        .values({
          email: data.email,
          emailVerified: new Date(),
        })
        .returning({ id: users.id, tokenVersion: users.tokenVersion });

      if (!newUser) {
        throw Exception.internalServerError("Возникла ошибка регистрации!");
      }

      user = newUser;
    }

    await setSession({
      user: {
        id: user.id,
      },
      version: user.tokenVersion,
    });

    deleteCookie(authCodeConfig.cookieName);

    return user;
  });
