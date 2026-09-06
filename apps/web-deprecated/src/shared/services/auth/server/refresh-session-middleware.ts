import type { Middleware } from "openapi-fetch";

import { createServerApiClientInstance } from "../../api/create-server-api-client-instance";
import { AuthApi } from "../api/auth-api";
import { getAuthConfigServerFn } from "../config/auth-config";
import { AuthService } from "./auth-service";
import { RefreshTokensService, type StorageEntry } from "./refresh-tokens-service";

const refreshTokensPromiseStorage = new Map<string, StorageEntry>();

export const refreshSessionMiddleware: Middleware = {
  async onResponse({ response, request }) {
    if (response.status === 401) {
      const authService = new AuthService(getAuthConfigServerFn());
      const tokens = await authService.getSessionTokens();

      if (!tokens) return;

      const authApi = createServerApiClientInstance(AuthApi);

      const refreshTokensService = new RefreshTokensService(refreshTokensPromiseStorage, authApi);

      const response = await refreshTokensService.refreshTokens(tokens.refreshToken);

      if (!response) return;

      await authService.setSessionTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      const headers = new Headers(request.headers);
      headers.set("Authorization", `Bearer ${response.accessToken}`);

      return fetch(request, { headers });
    }
  },
};
