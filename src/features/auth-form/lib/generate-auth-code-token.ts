import { SignJWT } from "jose";

import { millisecondsToSeconds } from "@/shared/lib/milleseconds-to-seconds";

import type { AuthCodeConfig } from "../config/auth-code-token-config";

export function generateAuthCodeToken(email: string, config: AuthCodeConfig) {
  const jwt = new SignJWT({ email })
    .setProtectedHeader({
      alg: config.tokenOptions.algorithm,
    })
    .setExpirationTime(
      millisecondsToSeconds(Date.now()) + config.tokenOptions.expiresIn,
    );

  return jwt.sign(new TextEncoder().encode(config.tokenOptions.secret));
}
