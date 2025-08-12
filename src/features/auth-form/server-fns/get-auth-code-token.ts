import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { devDelay } from "@/shared/lib/dev-delay";

import { authCodeConfig } from "../config/auth-code-config";
import { verifyAuthCodeToken } from "../lib/verify-auth-code-token";

export const getAuthCodeTokenServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  await devDelay();

  const token = getCookie(authCodeConfig.cookieName);

  if (!token) return null;

  return verifyAuthCodeToken(token, authCodeConfig);
});
