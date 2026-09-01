import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import {
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { I18nService } from "nestjs-i18n";

import { OpenApi } from "@/common/openapi/openapi.decorator";
import { ParseIntPipe } from "@/common/validation/parse-int.pipe";

import { TaskResponseDto } from "./dto/task-response.dto";
import { TasksService } from "./tasks.service";

@Controller({ path: "tasks", version: "1" })
@ApiExtraModels(TaskResponseDto)
export class TasksController {
  constructor(
    private readonly i18n: I18nService,
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  @OpenApi({
    summary: "Get all tasks",
    success: {
      data: {
        type: "array",
        items: { $ref: getSchemaPath(TaskResponseDto) },
      },
      message: "Tasks fetched successfully",
    },
  })
  findAll(): Promise<TaskResponseDto[]> {
    return this.tasksService.findAll();
  }

  @Get(":serialNumber")
  @OpenApi({
    summary: "Get task by serial number",
    success: {
      data: { $ref: getSchemaPath(TaskResponseDto) },
      message: "Task fetched successfully",
    },
    exceptions: [ApiNotFoundResponse, ApiUnprocessableEntityResponse],
  })
  async findOneBySerialNumber(
    @Param("serialNumber", ParseIntPipe) serialNumber: number,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.findOneBySerialNumber(serialNumber);

    if (!task) {
      throw new NotFoundException(this.i18n.t("common.taskNotFound"));
    }

    return task;
  }
}
