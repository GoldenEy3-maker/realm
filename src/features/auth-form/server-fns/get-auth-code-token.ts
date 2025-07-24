import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { Logger } from "@/shared/lib/logger";

import { authCodeConfig } from "../config/auth-code-token-config";
import { verifyAuthCodeToken } from "../lib/verify-auth-code-token";

export const getAuthCodeTokenServerFn = createServerFn({
  method: "GET",
}).handler(() => {
  const token = getCookie(authCodeConfig.cookieName);

  if (!token) {
    Logger.log("No auth code token found");
    return null;
  }

  return verifyAuthCodeToken(token, authCodeConfig);
});
