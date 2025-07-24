import { setCookie } from "@tanstack/react-start/server";

import { authConfig } from "./auth-config";
import { generateSessionToken } from "./auth-generate-session-token";
import { type AuthSession } from "./auth-session-schema";

export async function setSession(payload: AuthSession) {
  const sessionToken = await generateSessionToken(payload, authConfig);

  setCookie(authConfig.cookieName, sessionToken, authConfig.cookieOptions);
}
