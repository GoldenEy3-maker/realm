import { createAutoMapper } from "@/shared/lib/auto-mapper";

import { TaskDomainSchema } from "../model/task-domain";
import { TaskDtoSchema } from "../model/task-dto";

const taskAutoMapper = createAutoMapper(TaskDtoSchema, TaskDomainSchema);

export const { map: taskDtoToDomain, mapArray: taskDtoToDomainArray } =
  taskAutoMapper;
