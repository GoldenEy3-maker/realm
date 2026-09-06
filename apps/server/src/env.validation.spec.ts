import "reflect-metadata";

import { Environment, validate } from "./env.validation";

const validConfig = {
  NODE_ENV: Environment.Test,
  PORT: "3000",
  DB_HOST: "localhost",
  DB_PORT: "5432",
  DB_USER: "user",
  DB_PASSWORD: "pass",
  DB_NAME: "db",
  REDIS_HOST: "localhost",
  REDIS_PORT: "6379",
  REDIS_PASSWORD: "redis",
  MAIL_HOST: "smtp.example.com",
  MAIL_PORT: "587",
  MAIL_SECURE: "false",
  MAIL_USER: "user",
  MAIL_PASSWORD: "pass",
  MAIL_FROM: "from@example.com",
  AUTH_JWT_SECRET: "a".repeat(32),
};

describe("validate", () => {
  it("parses MAIL_SECURE 'false' as false", () => {
    expect(validate({ ...validConfig, MAIL_SECURE: "false" }).MAIL_SECURE).toBe(false);
  });

  it("parses MAIL_SECURE 'true' as true", () => {
    expect(validate({ ...validConfig, MAIL_SECURE: "true" }).MAIL_SECURE).toBe(true);
  });

  it("parses PORT '3000' as 3000", () => {
    expect(validate({ ...validConfig, REDIS_PORT: "3000" }).REDIS_PORT).toBe(3000);
  });

  it("parses MAIL_FROM 'from@example.com' as 'from@example.com'", () => {
    expect(validate({ ...validConfig, MAIL_FROM: "from@example.com" }).MAIL_FROM).toBe(
      "from@example.com",
    );
  });
});
