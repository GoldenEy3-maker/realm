import { SignJWT } from "jose";

import { millisecondsToSeconds } from "../milleseconds-to-seconds";
import { type AuthConfig } from "./auth-config";
import { type AuthSession } from "./auth-session-schema";

export function generateSessionToken(payload: AuthSession, config: AuthConfig) {
  return new SignJWT(payload)
    .setProtectedHeader({
      alg: config.sessionTokenOptions.alg,
    })
    .setExpirationTime(
      millisecondsToSeconds(Date.now()) + config.sessionCookieOptions.maxAge,
    )
    .sign(new TextEncoder().encode(config.sessionSecret));
}
