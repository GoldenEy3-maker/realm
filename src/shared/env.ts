import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_MODE: z.enum(["development", "production"]),
  },
  server: {
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(["development", "production"]),
  },
  runtimeEnv: {
    VITE_MODE: import.meta.env.MODE,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
});
