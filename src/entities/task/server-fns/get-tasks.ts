import { db } from "@/shared/db";
import { tasks } from "@/shared/db/schema/tasks";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";

export const getTasksServerFn = createServerFn({ method: "GET" })
  .validator(
    z.object({
      limit: z.number().min(1).max(100).default(10),
    }),
  )
  .handler(async ({ data }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return db.select().from(tasks).limit(data.limit);
  });
