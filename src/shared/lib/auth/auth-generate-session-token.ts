import { SignJWT } from "jose";

import { encrypt } from "../encription";
import { millisecondsToSeconds } from "../milleseconds-to-seconds";
import { type AuthConfig } from "./auth-config";
import { type AuthSession } from "./auth-session-schema";

export function generateSessionToken(payload: AuthSession, config: AuthConfig) {
  const encryptedPrivatePayload = encrypt(
    JSON.stringify(payload),
    config.tokenOptions.encryption,
  );

  const jwt = new SignJWT({ _enc: encryptedPrivatePayload })
    .setProtectedHeader({
      alg: config.tokenOptions.alg,
    })
    .setExpirationTime(
      millisecondsToSeconds(Date.now()) + config.cookieOptions.maxAge,
    );

  return jwt.sign(new TextEncoder().encode(config.tokenOptions.secret));
}
