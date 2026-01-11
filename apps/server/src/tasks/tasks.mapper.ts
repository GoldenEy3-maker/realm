import { TaskResponseDto } from "./dto/task-response.dto";
import { Task } from "./entities/task.entity";

export class TasksMapper {
  static toDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      serialNumber: task.serialNumber,
      description: task.description,
    };
  }
}
