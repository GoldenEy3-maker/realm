import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { TaskResponseDto } from "./dto/task-response.dto";
import { TasksMapper } from "./tasks.mapper";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>) {}

  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepository.find();
    return tasks.map((task) => TasksMapper.toDto(task));
  }

  async findOneBySerialNumber(serialNumber: number): Promise<TaskResponseDto | null> {
    const task = await this.tasksRepository.findOne({ where: { serialNumber } });
    return task ? TasksMapper.toDto(task) : null;
  }
}
