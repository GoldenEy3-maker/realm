import { setCookie } from "@tanstack/react-start/server";

import type { AuthCodeConfig } from "../config/auth-code-token-config";

export function setAuthCodeCookie(token: string, config: AuthCodeConfig) {
  return setCookie(config.cookieName, token, {
    httpOnly: config.cookieOptions.httpOnly,
    secure: config.cookieOptions.secure,
    maxAge: config.cookieOptions.maxAge,
    sameSite: config.cookieOptions.sameSite,
  });
}
