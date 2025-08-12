import { createAutoMapper } from "@/shared/lib/auto-mapper";

import { taskDomainSchema } from "../model/task-domain";
import { taskDtoSchema } from "../model/task-dto";

const taskAutoMapper = createAutoMapper(taskDtoSchema, taskDomainSchema);

export const { map: taskDtoToDomain, mapArray: taskDtoToDomainArray } =
  taskAutoMapper;
