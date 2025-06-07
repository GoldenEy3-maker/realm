import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const clientEnv = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_MODE: z.enum(["development", "production"]),
  },
  runtimeEnv: {
    VITE_MODE: import.meta.env.MODE,
  },
});
