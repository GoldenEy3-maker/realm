import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskResponseDto } from "./dto/task-response.dto";
import {
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { ParseIntPipe } from "../validation/parse-int.pipe";
import { OpenApi } from "../openapi/openapi.decorator";
import { I18nService } from "nestjs-i18n";

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
    exeptions: [ApiNotFoundResponse, ApiUnprocessableEntityResponse],
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
