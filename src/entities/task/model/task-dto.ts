import { schemaValidation } from "@/shared/lib/schema-validation";

import { type TaskRawModel } from "./task-raw-model";

export const taskDtoSchema = schemaValidation.custom<TaskRawModel>();

export type TaskDto = schemaValidation.infer<typeof taskDtoSchema>;
