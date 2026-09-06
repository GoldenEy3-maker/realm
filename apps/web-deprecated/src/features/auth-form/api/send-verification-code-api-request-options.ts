import type { ApiRequestOptions } from "@/shared/services/api/api-request-options";

export type SendVerificationCodeApiRequestOptions = ApiRequestOptions<
  "/v1/auth/send-verification-code",
  "post"
>;

