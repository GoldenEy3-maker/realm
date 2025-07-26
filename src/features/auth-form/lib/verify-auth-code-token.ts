import { jwtVerify } from "jose";

import { Logger } from "@/shared/lib/logger";

import type { AuthCodeConfig } from "../config/auth-code-config";
import { authCodeTokenSchema } from "../model/auth-code-token-schema";

export async function verifyAuthCodeToken(
  token: string,
  config: AuthCodeConfig,
) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(config.tokenOptions.secret),
    );

    return authCodeTokenSchema.parse(payload);
  } catch (error) {
    Logger.error(error);
    return null;
  }
}
