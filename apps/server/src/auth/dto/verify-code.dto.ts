import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class VerifyCodeDto {
  @ApiProperty({ type: "string", format: "email", required: true })
  @IsEmail({}, { message: i18nValidationMessage("validation.invalidEmail") })
  email: string;

  @ApiProperty({ type: "string", required: true })
  @IsNotEmpty({ message: i18nValidationMessage("validation.notEmpty") })
  @IsString({ message: i18nValidationMessage("validation.mustBeString") })
  code: string;
}
