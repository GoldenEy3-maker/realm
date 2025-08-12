import type { AnyFunction } from "./any-function";

export interface GetQueryOptionsParamsWithFetcher<T extends AnyFunction> {
  fetcher: (options: Parameters<T>[0]) => ReturnType<T>;
}
