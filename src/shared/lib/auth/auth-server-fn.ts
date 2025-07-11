import { createServerFn } from "@tanstack/react-start";

import { db } from "../../db";
import { eq } from "../../db/orm-utils";
import { users } from "../../db/schema/users";
import { getSession } from "./auth-get-session";
import { setSession } from "./auth-set-session";

export const authServerFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await getSession();

    if (!session) return null;

    const [user] = await db
      .select({
        id: users.id,
        tokenVersion: users.tokenVersion,
      })
      .from(users)
      .where(eq(users.id, session.user.id));

    if (!user) return null;

    if (session.version !== user.tokenVersion) return null;

    await setSession({ user, version: user.tokenVersion });

    return session;
  },
);
