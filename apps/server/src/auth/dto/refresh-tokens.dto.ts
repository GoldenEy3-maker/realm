import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokensDto {
  @ApiProperty({
    type: "string",
  })
  @IsString()
  refreshToken: string;
}
