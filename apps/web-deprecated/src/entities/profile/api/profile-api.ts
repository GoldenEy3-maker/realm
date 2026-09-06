import type { ApiClient } from "@/shared/services/api/api-client";

import type { ProfileResponseDTO } from "../model/profile-response-dto";

export class ProfileApi {
  constructor(private readonly api: ApiClient) {}

  async getProfile(): Promise<ProfileResponseDTO | null> {
    const response = await this.api.GET("/v1/profile");

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data?.data ?? null;
  }
}
