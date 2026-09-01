import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TaskResponseDto } from "./dto/task-response.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>) {}

  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepository.find();
    return tasks.map((task) => task.toDto());
  }

  async findOneBySerialNumber(serialNumber: number): Promise<TaskResponseDto | null> {
    const task = await this.tasksRepository.findOne({ where: { serialNumber } });
    return task?.toDto() ?? null;
  }
}
