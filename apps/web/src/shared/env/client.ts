import { createEnv } from "@t3-oss/env-core";

import { schemaValidation } from "../lib/schema-validation";

export const clientEnv = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: schemaValidation.string(),
  },
  skipValidation: process.env.NODE_ENV === "test",
  runtimeEnv: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  },
});
