import { createEnv } from "@t3-oss/env-core";

import { schemaValidation } from "../lib/schema-validation";

export const serverEnv = createEnv({
  server: {
    AUTH_JWT_SECRET: schemaValidation.string(),
    AUTH_JWT_ENCRYPTION_SECRET: schemaValidation.string(),
    AUTH_CODE_TOKEN_SECRET: schemaValidation.string(),
  },
  skipValidation: process.env.NODE_ENV === "test",
  runtimeEnv: {
    AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET,
    AUTH_JWT_ENCRYPTION_SECRET: process.env.AUTH_JWT_ENCRYPTION_SECRET,
    AUTH_CODE_TOKEN_SECRET: process.env.AUTH_CODE_TOKEN_SECRET,
  },
});
