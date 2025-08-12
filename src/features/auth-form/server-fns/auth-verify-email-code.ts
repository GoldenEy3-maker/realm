import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";

import { CommonUIMessages } from "@/shared/constants/common-ui-messages";
import { RedisKeyMap } from "@/shared/constants/redis-key-map";
import { db, redis } from "@/shared/db";
import { users } from "@/shared/db/schema/users";
import { setSession } from "@/shared/lib/auth/auth-set-session";
import { devDelay } from "@/shared/lib/dev-delay";
import { Exception } from "@/shared/lib/exception";

import { authCodeConfig } from "../config/auth-code-config";
import { AuthFormUIMessages } from "../constants/auth-form-ui-messages";
import { authFormSchema } from "../model/auth-form-schema";

export const authVerifyEmailCodeServerFn = createServerFn({ method: "POST" })
  .validator(authFormSchema)
  .handler(async ({ data }) => {
    await devDelay();

    await redis.connect();

    const code = await redis.hGet(RedisKeyMap.AUTH_CODE, data.email);

    await redis.close();

    if (!code || code !== data.code)
      throw Exception.unauthorized(CommonUIMessages.INVALID_CODE);

    let [user] = await db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        tokenVersion: users.tokenVersion,
      })
      .from(users)
      .where(eq(users.email, data.email));

    if (!user) {
      const [newUser] = await db
        .insert(users)
        .values({
          email: data.email,
          emailVerified: new Date(),
        })
        .returning({
          id: users.id,
          email: users.email,
          username: users.username,
          tokenVersion: users.tokenVersion,
        });

      if (!newUser)
        throw Exception.internalServerError(
          AuthFormUIMessages.REGISTRATION_ERROR,
        );

      user = newUser;
    }

    await setSession({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      version: user.tokenVersion,
    });

    deleteCookie(authCodeConfig.cookieName);

    return user;
  });
