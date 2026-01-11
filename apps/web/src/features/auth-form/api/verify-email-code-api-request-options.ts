import type { ApiRequestOptions } from "@/shared/services/api/api-request-options";

export type VerifyEmailCodeApiRequestOptions = ApiRequestOptions<"/v1/auth/verify-code", "post">;

