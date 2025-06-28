import { createServerFn } from "@tanstack/react-start";

import { db } from "@/shared/db";
import { tasks } from "@/shared/db/schema/tasks";
import { schemaValidation } from "@/shared/lib/schema-validation";

export const getTasksServerFn = createServerFn({ method: "GET" })
  .validator(
    schemaValidation.object({
      limit: schemaValidation.number().min(1).max(100).default(10),
    }),
  )
  .handler(({ data }) => {
    return db.select().from(tasks).limit(data.limit);
  });
