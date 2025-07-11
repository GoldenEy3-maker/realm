import { setCookie } from "@tanstack/react-start/server";

import { authConfig } from "./auth-config";
import { encodeSessionToken } from "./auth-encode-session-token";
import { generateSessionToken } from "./auth-generate-session-token";
import { AuthSession } from "./auth-session-schema";

export async function setSession(payload: AuthSession) {
  const sessionToken = await generateSessionToken(payload, authConfig);
  const encodedSessionToken = encodeSessionToken(sessionToken, authConfig);

  setCookie(
    authConfig.sessionCookieName,
    encodedSessionToken,
    authConfig.sessionCookieOptions,
  );
}
