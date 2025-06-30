import { createEnv } from "@t3-oss/env-core";

import { schemaValidation } from "./lib/schema-validation";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_MODE: schemaValidation.enum(["development", "production"]),
  },
  server: {
    DATABASE_URL: schemaValidation.string(),
    NODE_ENV: schemaValidation.enum(["development", "production"]),
  },
  runtimeEnv: {
    VITE_MODE: import.meta.env.MODE,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
});
