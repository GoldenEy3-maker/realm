import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { db } from "@/shared/db";
import { users } from "@/shared/db/schema/users";

import { getSession } from "./auth-get-session";
import { authServerFnOptionsSchema } from "./auth-server-fn-options-schema";
import { setSession } from "./auth-set-session";

export const authServerFn = createServerFn({ method: "GET" })
  .validator(authServerFnOptionsSchema.optional())
  .handler(async ({ data = { shouldUpdateSession: true } }) => {
    const session = await getSession();

    if (!session) return null;

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        tokenVersion: users.tokenVersion,
        username: users.username,
      })
      .from(users)
      .where(eq(users.id, session.user.id));

    if (!user) return null;

    if (session.version !== user.tokenVersion) return null;

    if (data?.shouldUpdateSession)
      await setSession({ user, version: user.tokenVersion });

    return session;
  });
