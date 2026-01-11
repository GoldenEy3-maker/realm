import type { ClientOptions, Middleware } from "openapi-fetch";

import type { ApiClient } from "./api-client";
import { createApiClient } from "./create-api-client";

interface ServerApiClientOptions extends ClientOptions {
  middlewares?: Middleware[];
}

type Constructor = new (api: ApiClient) => unknown;
type ConstructorInstances<T extends readonly Constructor[]> = {
  [K in keyof T]: T[K] extends new (api: ApiClient) => infer R ? R : never;
};

export function createServerApiClientInstance<T extends readonly Constructor[]>(
  ...args: [...constructors: T, options: ServerApiClientOptions]
): T["length"] extends 1 ? ConstructorInstances<T>[0] : ConstructorInstances<T>;

export function createServerApiClientInstance<T extends readonly Constructor[]>(
  ...constructors: T
): T["length"] extends 1 ? ConstructorInstances<T>[0] : ConstructorInstances<T>;

export function createServerApiClientInstance(...args: unknown[]) {
  const lastArg = args.at(-1);

  const isLastArgOptions =
    typeof lastArg === "object" && lastArg !== null && !(lastArg instanceof Function);
  const options = isLastArgOptions ? (lastArg as ServerApiClientOptions) : {};

  const constructors = isLastArgOptions ? args.slice(0, -1) : args;

  const apiClient = createApiClient(options);

  if (options.middlewares) {
    apiClient.use(...options.middlewares);
  }

  if (constructors.length === 1) {
    const ApiConstructor = constructors[0] as Constructor;
    return new ApiConstructor(apiClient);
  }

  return constructors.map((ApiConstructor) => new (ApiConstructor as Constructor)(apiClient));
}
