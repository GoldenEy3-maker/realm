import type { paths } from "@openapi";

/**
 * Extracts request body from the API schema
 */
export type ApiRequestBody<
  TPath extends keyof paths,
  TMethod extends keyof paths[TPath],
> = paths[TPath][TMethod] extends { requestBody?: never }
  ? never
  : paths[TPath][TMethod] extends {
        requestBody: {
          content: {
            "application/json": infer P;
          };
        };
      }
    ? P
    : paths[TPath][TMethod] extends {
          requestBody?: {
            content: {
              "application/json": infer P;
            };
          };
        }
      ? P
      : never;
