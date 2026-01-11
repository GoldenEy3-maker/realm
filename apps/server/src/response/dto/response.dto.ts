import { ApiProperty } from "@nestjs/swagger";
import { ValidationErrors } from "../../validation/validation-errors.interface";

export class BaseResponseMetaDto {
  @ApiProperty({
    type: "number",
    example: 100,
    description: "Duration of the request in milliseconds",
  })
  duration: number;

  @ApiProperty({
    type: "string",
    example: "2026-01-01 12:00:00",
    description: "Timestamp of the request",
  })
  timestamp: string;
}

export class BaseResponseDto {
  @ApiProperty({ type: "boolean", example: true })
  success: boolean;

  @ApiProperty({ type: "number", example: 200 })
  statusCode: number;

  @ApiProperty({ type: "string", example: "/path/to/endpoint" })
  path: string;

  @ApiProperty({ type: "string", example: "success" })
  message: string;

  @ApiProperty({ type: BaseResponseMetaDto })
  meta: BaseResponseMetaDto;
}

export class ResponseDto<T> extends BaseResponseDto {
  @ApiProperty()
  data: T;
}

export class ErrorResponseDto extends BaseResponseDto {
  @ApiProperty({
    type: "object",
    properties: {
      message: { type: "string", example: "error message" },
      error: { type: "string", example: "error message" },
      errors: {
        type: "object",
        additionalProperties: {
          type: "array",
          items: { type: "string" },
        },
        example: { field: ["error message"] },
      },
    },
    example: {
      message: "error message",
      error: "error message",
      errors: { field: ["error message"] },
    },
  })
  error: { message: string; error: string; errors: ValidationErrors };
}
