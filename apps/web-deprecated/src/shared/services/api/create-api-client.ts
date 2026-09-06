import type { paths } from "@openapi";
import createClient, { type ClientOptions } from "openapi-fetch";

import { clientEnv } from "@/shared/env/client";

export function createApiClient(options: ClientOptions) {
  return createClient<paths>({
    ...options,
    baseUrl: options.baseUrl ?? clientEnv.VITE_API_URL,
    headers: {
      accept: "application/json",
      "Accept-Language": "ru",
      ...options.headers,
    },
  });
}
