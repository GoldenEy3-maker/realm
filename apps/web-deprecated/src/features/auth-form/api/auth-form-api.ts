import type { ApiClient } from "@/shared/services/api/api-client";

import type { AuthResponseDTO } from "../model/auth-response-dto";
import type { SendVerificationCodeApiRequestOptions } from "./send-verification-code-api-request-options";
import type { VerifyEmailCodeApiRequestOptions } from "./verify-email-code-api-request-options";

export class AuthFormApi {
  constructor(private readonly apiClient: ApiClient) {}

  async verifyEmailCode(
    requestOptions: VerifyEmailCodeApiRequestOptions,
  ): Promise<AuthResponseDTO | null> {
    const response = await this.apiClient.POST("/v1/auth/verify-code", requestOptions);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data?.data ?? null;
  }

  async sendVerificationCode(
    requestOptions: SendVerificationCodeApiRequestOptions,
  ): Promise<boolean> {
    const response = await this.apiClient.POST("/v1/auth/send-verification-code", requestOptions);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data?.data ?? false;
  }
}
