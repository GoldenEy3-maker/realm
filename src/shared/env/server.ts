import { createEnv } from "@t3-oss/env-core";

import { schemaValidation } from "../lib/schema-validation";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: schemaValidation.string(),
    REDIS_URL: schemaValidation.string(),
    NODE_ENV: schemaValidation.enum(["development", "production"]),
    SESSION_SECRET: schemaValidation.string(),
    SESSION_ENCRYPTION_SECRET: schemaValidation.string(),
    AUTH_CODE_TOKEN_SECRET: schemaValidation.string(),
    MAILER_HOST: schemaValidation.string(),
    MAILER_PORT: schemaValidation.string(),
    MAILER_SECURE: schemaValidation.stringbool(),
    MAILER_USER: schemaValidation.string(),
    MAILER_PASS: schemaValidation.string(),
    MAILER_FROM: schemaValidation.string(),
  },
  skipValidation: process.env.NODE_ENV === "test",
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    NODE_ENV: process.env.NODE_ENV,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SESSION_ENCRYPTION_SECRET: process.env.SESSION_ENCRYPTION_SECRET,
    AUTH_CODE_TOKEN_SECRET: process.env.AUTH_CODE_TOKEN_SECRET,
    MAILER_HOST: process.env.MAILER_HOST,
    MAILER_PORT: process.env.MAILER_PORT,
    MAILER_SECURE: process.env.MAILER_SECURE,
    MAILER_USER: process.env.MAILER_USER,
    MAILER_PASS: process.env.MAILER_PASS,
    MAILER_FROM: process.env.MAILER_FROM,
  },
});
