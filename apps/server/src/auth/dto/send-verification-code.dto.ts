import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class SendVerificationCodeDto {
  @ApiProperty({ type: "string", format: "email", required: true })
  @IsEmail({}, { message: i18nValidationMessage("validation.invalidEmail") })
  email: string;
}
