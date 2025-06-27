import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";

import { db } from "@/shared/db";
import { tasks } from "@/shared/db/schema/tasks";

export const getTasksServerFn = createServerFn({ method: "GET" })
  .validator(
    z.object({
      limit: z.number().min(1).max(100).default(10),
    }),
  )
  .handler(({ data }) => {
    return db.select().from(tasks).limit(data.limit);
  });
