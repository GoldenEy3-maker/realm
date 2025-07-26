import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { authCodeConfig } from "../config/auth-code-config";
import { verifyAuthCodeToken } from "../lib/verify-auth-code-token";

export const getAuthCodeTokenServerFn = createServerFn({
  method: "GET",
}).handler(() => {
  const token = getCookie(authCodeConfig.cookieName);

  if (!token) return null;

  return verifyAuthCodeToken(token, authCodeConfig);
});
