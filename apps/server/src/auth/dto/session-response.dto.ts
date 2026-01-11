import { ApiProperty } from "@nestjs/swagger";
import { UserStatus } from "../../users/entities/user.entity";

export class SessionResponseDto {
  @ApiProperty({ type: "number", example: 1 })
  id: number;

  @ApiProperty({ type: "string", example: "John" })
  username: string;

  @ApiProperty({ type: "string", example: "john@example.com" })
  email: string;

  @ApiProperty({ type: "string", enum: UserStatus })
  status: UserStatus;
}
