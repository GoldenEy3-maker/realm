import type { InferSelectModel } from "drizzle-orm";

import type { tasks } from "@/shared/db/schema/tasks";

export type TaskRawModel = InferSelectModel<typeof tasks>;
