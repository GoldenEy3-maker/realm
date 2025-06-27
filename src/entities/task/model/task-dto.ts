import * as z from "zod/v4";

import { TaskRawModel } from "./task-raw-model";

export const TaskDtoSchema = z.custom<TaskRawModel>();

export type TaskDto = z.output<typeof TaskDtoSchema>;
