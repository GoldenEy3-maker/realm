import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { devDelay } from "@/shared/lib/dev-delay";

import { getAuthEmailVerificationIntentConfigServerFn } from "../config/auth-email-verification-intent-config";
import { AuthEmailVerificationIntentService } from "../lib/auth-email-verification-intent-service";

export const getAuthEmailVerificationIntentTokenServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  await devDelay();

  const authEmailVerificationIntentService = new AuthEmailVerificationIntentService(
    getAuthEmailVerificationIntentConfigServerFn(),
  );

  const token = getCookie(getAuthEmailVerificationIntentConfigServerFn().cookieName);

  if (!token) return null;

  return authEmailVerificationIntentService.verifyToken(token);
});
