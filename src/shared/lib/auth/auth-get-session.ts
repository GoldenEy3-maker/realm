import { getCookie } from "@tanstack/react-start/server";

import { authConfig } from "./auth-config";
import { type AuthSession } from "./auth-session-schema";
import { verifySessionToken } from "./auth-verify-token-session";

export async function getSession(): Promise<AuthSession | null> {
  const session = getCookie(authConfig.cookieName);

  if (!session) return null;

  return verifySessionToken(session);
}
