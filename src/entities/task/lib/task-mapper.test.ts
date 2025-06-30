import { describe, expect, it } from "vitest";

import { TaskDto } from "../model/task-dto";
import { taskDtoToDomain } from "./task-mappers";

describe("Task Mapper", () => {
  const mockTaskDto: TaskDto = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    slug: "test-task",
    title: "Test Task",
    serialNumber: 1,
    description: "Test description",
    completed: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  };

  it("should map DTO to Domain correctly", () => {
    const result = taskDtoToDomain(mockTaskDto);

    expect(result).toEqual({
      id: mockTaskDto.id,
      slug: mockTaskDto.slug,
      title: mockTaskDto.title,
      serialNumber: mockTaskDto.serialNumber,
      description: mockTaskDto.description,
      completed: mockTaskDto.completed,
      createdAt: mockTaskDto.createdAt,
      updatedAt: mockTaskDto.updatedAt,
    });
  });

  it("should throw error for invalid DTO", () => {
    const invalidDto = {
      id: "invalid-uuid",
      slug: "",
      title: "",
      description: null,
      serialNumber: "not-number",
      completed: "not-boolean",
      createdAt: "invalid-date",
      updatedAt: "invalid-date",
    };

    expect(() => taskDtoToDomain(invalidDto)).toThrow();
  });
});
