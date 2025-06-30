import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { db } from "@/shared/db";
import { tasks } from "@/shared/db/schema/tasks";
import { schemaValidation } from "@/shared/lib/schema-validation";

export const getTaskBySlugServerFn = createServerFn({
  method: "GET",
})
  .validator(schemaValidation.object({ slug: schemaValidation.string() }))
  .handler(async ({ data }) => {
    const selectResult = await db
      .select()
      .from(tasks)
      .where(eq(tasks.slug, data.slug))
      .limit(1);

    return selectResult[0];
  });
