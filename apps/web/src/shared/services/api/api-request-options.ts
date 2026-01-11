import type { paths } from "@openapi";

import type { HasRequiredFields } from "@/shared/types/has-required-fields";

import type { ApiParams } from "./api-params";
import type { ApiRequestBody } from "./api-request-body";

/**
 * Typed API request options for specific path and method
 */
export type ApiRequestOptions<
  TPath extends keyof paths = keyof paths,
  TMethod extends keyof paths[TPath] = keyof paths[TPath],
> = {
  signal?: AbortSignal;
} & (ApiParams<TPath, TMethod> extends never
  ? unknown
  : HasRequiredFields<ApiParams<TPath, TMethod>> extends true
    ? { params: ApiParams<TPath, TMethod> }
    : { params?: ApiParams<TPath, TMethod> }) &
  (ApiRequestBody<TPath, TMethod> extends never
    ? unknown
    : HasRequiredFields<ApiRequestBody<TPath, TMethod>> extends true
      ? { body: ApiRequestBody<TPath, TMethod> }
      : { body?: ApiRequestBody<TPath, TMethod> });
