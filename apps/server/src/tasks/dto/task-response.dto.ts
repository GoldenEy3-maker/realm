import { ApiProperty } from "@nestjs/swagger";

export class TaskResponseDto {
  @ApiProperty({ type: "number", example: 1 })
  id: number;

  @ApiProperty({ type: "string", example: "Task 1" })
  title: string;

  @ApiProperty({ type: "number", example: 1 })
  serialNumber: number;

  @ApiProperty({ type: "string", example: "Description of the task" })
  description: string;
}
