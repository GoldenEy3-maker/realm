import { NestLensModule } from "nestlens";

import { Environment } from "@/env.validation";

export const nestLensEnabled = process.env.NODE_ENV === Environment.Development;

export function createNestlensModuleForRoot() {
  return NestLensModule.forRoot({
    enabled: nestLensEnabled,
    rateLimit: false,
  });
}
