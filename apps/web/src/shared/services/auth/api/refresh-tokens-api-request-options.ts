import type { ApiRequestOptions } from "../../api/api-request-options";

export type RefreshTokensApiRequestOptions = ApiRequestOptions<"/v1/auth/refresh-tokens", "post">;
