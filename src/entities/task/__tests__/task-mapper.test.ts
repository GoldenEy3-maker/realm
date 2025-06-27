import { describe, expect, it } from "vitest";

import { taskDtoToDomain } from "../lib/task-mappers";
import { TaskDto } from "../model/task-dto";

describe("Task Mapper", () => {
  const mockTaskDto: TaskDto = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    slug: "test-task",
    title: "Test Task",
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
      description: mockTaskDto.description,
      completed: mockTaskDto.completed,
      createdAt: mockTaskDto.createdAt,
      updatedAt: mockTaskDto.updatedAt,
      isOverdue: false,
      priority: "medium",
      tags: [],
    });
  });

  it("should throw error for invalid DTO", () => {
    const invalidDto = {
      id: "invalid-uuid",
      slug: "",
      title: "",
      description: null,
      completed: "not-boolean",
      createdAt: "invalid-date",
      updatedAt: "invalid-date",
    };

    expect(() => taskDtoToDomain(invalidDto)).toThrow();
  });
});
