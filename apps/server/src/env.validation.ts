import { plainToInstance } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsString, MinLength, validateSync } from "class-validator";
import { parseBoolean } from "./common/utils/parse-boolean.util";

export enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  REDIS_HOST: string;

  @IsNumber()
  REDIS_PORT: number;

  @IsString()
  REDIS_PASSWORD: string;

  @IsString()
  MAIL_HOST: string;

  @IsNumber()
  MAIL_PORT: number;

  @IsBoolean()
  MAIL_SECURE: boolean;

  @IsString()
  MAIL_USER: string;

  @IsString()
  MAIL_PASSWORD: string;

  @IsString()
  MAIL_FROM: string;

  @IsString()
  @MinLength(32, {
    message: "AUTH_JWT_SECRET must be at least 32 characters long for security",
  })
  AUTH_JWT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const processedConfig = {
    ...config,
    MAIL_SECURE: parseBoolean(config.MAIL_SECURE),
  };

  const validatedConfig = plainToInstance(EnvironmentVariables, processedConfig, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
