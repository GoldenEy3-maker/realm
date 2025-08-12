import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { db } from "@/shared/db";
import { profiles } from "@/shared/db/schema/profiles";
import { authMiddelware } from "@/shared/lib/auth";

export const getProfileServerFn = createServerFn({ method: "GET" })
  .middleware([authMiddelware])
  .handler(({ context }) => {
    return db.query.profiles.findFirst({
      where: eq(profiles.userId, context.session.user.id),
    });
  });
