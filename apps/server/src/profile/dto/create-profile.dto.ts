import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateProfileDto {
  @ApiProperty({ type: "string" })
  @IsString({ message: i18nValidationMessage("validation.mustBeString") })
  @IsNotEmpty({ message: i18nValidationMessage("validation.notEmpty") })
  @IsOptional()
  lastName?: string;

  @ApiProperty({ type: "string", required: true })
  @IsString({ message: i18nValidationMessage("validation.mustBeString") })
  @IsNotEmpty({ message: i18nValidationMessage("validation.notEmpty") })
  firstName: string;

  @ApiProperty({ type: "string" })
  @IsString({ message: i18nValidationMessage("validation.mustBeString") })
  @IsNotEmpty({ message: i18nValidationMessage("validation.notEmpty") })
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({ type: "string" })
  @IsString({ message: i18nValidationMessage("validation.mustBeString") })
  @IsNotEmpty({ message: i18nValidationMessage("validation.notEmpty") })
  @IsOptional()
  bio?: string;

  @ApiProperty({ type: "string", format: "date", example: "1990-01-01" })
  @IsString({ message: i18nValidationMessage("validation.mustBeString") })
  @IsNotEmpty({ message: i18nValidationMessage("validation.notEmpty") })
  @IsOptional()
  birthDate?: string;
}
