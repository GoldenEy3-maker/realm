import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { TaskResponseDto } from "../dto/task-response.dto";

@Entity({ name: "tasks" })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 256 })
  title: string;

  @Column({ name: "serial_number", type: "integer", unique: true, generated: "increment" })
  serialNumber: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "boolean", default: false })
  completed: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  toDto(): TaskResponseDto {
    return new TaskResponseDto(this.id, this.title, this.serialNumber, this.description);
  }
}
