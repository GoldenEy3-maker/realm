import type { ApiClient } from "../../api/api-client";
import type { AuthResponseDTO } from "../model/auth-response-dto";
import type { SessionResponseDTO } from "../model/session-response-dto";
import type { RefreshTokensApiRequestOptions } from "./refresh-tokens-api-request-options";

export class AuthApi {
  constructor(private readonly apiClient: ApiClient) {}

  async getSession(): Promise<SessionResponseDTO | null> {
    const response = await this.apiClient.GET("/v1/auth/session");

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data?.data ?? null;
  }

  async refreshTokens(
    requestOptions: RefreshTokensApiRequestOptions,
  ): Promise<AuthResponseDTO | null> {
    const response = await this.apiClient.POST("/v1/auth/refresh-tokens", requestOptions);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data?.data ?? null;
  }
}
