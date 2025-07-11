import { createEnv } from "@t3-oss/env-core";

import { schemaValidation } from "../lib/schema-validation";

export const clientEnv = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_MODE: schemaValidation.enum(["development", "production"]),
  },
  skipValidation: process.env.NODE_ENV === "test",
  runtimeEnv: {
    VITE_MODE: import.meta.env.VITE_MODE,
  },
});
