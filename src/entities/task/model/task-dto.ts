import { schemaValidation } from "@/shared/lib/schema-validation";

import { TaskRawModel } from "./task-raw-model";

export const TaskDtoSchema = schemaValidation.custom<TaskRawModel>();

export type TaskDto = schemaValidation.output<typeof TaskDtoSchema>;
