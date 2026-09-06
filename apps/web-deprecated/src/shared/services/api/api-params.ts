import type { paths } from "@openapi";

/**
 * Extracts parameters from the API schema
 */
export type ApiParams<
  TPath extends keyof paths,
  TMethod extends keyof paths[TPath],
> = paths[TPath][TMethod] extends {
  parameters: infer P;
}
  ? P
  : never;
