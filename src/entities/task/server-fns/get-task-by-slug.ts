import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";

import { db } from "@/shared/db";
import { tasks } from "@/shared/db/schema/tasks";

export const getTaskBySlugServerFn = createServerFn({
  method: "GET",
})
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const selectResult = await db
      .select()
      .from(tasks)
      .where(eq(tasks.slug, data.slug))
      .limit(1);

    return selectResult[0];
  });
