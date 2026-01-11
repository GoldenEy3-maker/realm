import { createServerFn } from "@tanstack/react-start";

import { Logger } from "@/shared/lib/logger";

import { getAuthConfigServerFn } from "../config/auth-config";
import { AuthService } from "./auth-service";

export const authDestroySessionServerFn = createServerFn({
  method: "POST",
}).handler(() => {
  try {
    const authService = new AuthService(getAuthConfigServerFn());
    authService.destroySessionTokens();

    return true;
  } catch (error) {
    Logger.error(error);

    return false;
  }
});
