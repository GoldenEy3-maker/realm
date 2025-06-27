import { InferSelectModel } from "drizzle-orm";

import { tasks } from "@/shared/db/schema/tasks";

export type TaskRawModel = InferSelectModel<typeof tasks>;
