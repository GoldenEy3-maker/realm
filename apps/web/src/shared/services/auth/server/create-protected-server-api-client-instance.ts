import type { ApiClient } from "../../api/api-client";
import { createServerApiClientInstance } from "../../api/create-server-api-client-instance";
import { getAuthConfigServerFn } from "../config/auth-config";
import { AuthService } from "./auth-service";
import { refreshSessionMiddleware } from "./refresh-session-middleware";

export async function createProtectedServerApiClientInstance<
  T extends new (api: ApiClient) => unknown,
>(ApiConstructor: T): Promise<InstanceType<T>>;
export async function createProtectedServerApiClientInstance<
  T extends Array<new (api: ApiClient) => unknown>,
>(
  ...args: T
): Promise<{ [K in keyof T]: T[K] extends new (api: ApiClient) => infer R ? R : never }>;

export async function createProtectedServerApiClientInstance<
  T extends Array<new (api: ApiClient) => unknown>,
>(...args: T) {
  const authService = new AuthService(getAuthConfigServerFn());
  const tokens = await authService.getSessionTokens();

  return createServerApiClientInstance(...args, {
    headers: { Authorization: `Bearer ${tokens?.accessToken ?? ""}` },
    middlewares: [refreshSessionMiddleware],
  });
}
