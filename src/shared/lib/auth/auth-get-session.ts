import { getCookie } from "@tanstack/react-start/server";

import { authConfig } from "./auth-config";
import { decodeSessionToken } from "./auth-decode-session-token";
import { type AuthSession } from "./auth-session-schema";
import { verifySessionToken } from "./auth-verify-token-session";

export async function getSession(): Promise<AuthSession | null> {
  const session = getCookie(authConfig.sessionCookieName);

  if (!session) return null;

  const decodedSessionToken = decodeSessionToken(session, authConfig);

  if (!decodedSessionToken) return null;

  return verifySessionToken(decodedSessionToken);
}
