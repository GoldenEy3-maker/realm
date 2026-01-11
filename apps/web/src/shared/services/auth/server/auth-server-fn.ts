import { createServerFn } from "@tanstack/react-start";

import { Logger } from "@/shared/lib/logger";

import { createServerApiClientInstance } from "../../api/create-server-api-client-instance";
import { AuthApi } from "../api/auth-api";
import { getAuthConfigServerFn } from "../config/auth-config";
import type { SessionResponseDTO } from "../model/session-response-dto";
import { AuthService } from "./auth-service";
import { refreshSessionMiddleware } from "./refresh-session-middleware";

export const authServerFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<SessionResponseDTO | null> => {
    try {
      const authService = new AuthService(getAuthConfigServerFn());
      const tokens = await authService.getSessionTokens();

      if (!tokens) return null;

      const authApi = createServerApiClientInstance(AuthApi, {
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
        middlewares: [refreshSessionMiddleware],
      });

      const session = await authApi.getSession();

      return session;
    } catch (error) {
      Logger.error(error);
      return null;
    }
  },
);
