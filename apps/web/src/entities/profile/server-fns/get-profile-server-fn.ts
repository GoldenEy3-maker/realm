import { createServerFn } from "@tanstack/react-start";

import { devDelay } from "@/shared/lib/dev-delay";
import { createProtectedServerApiClientInstance } from "@/shared/services/auth/server";

import { ProfileApi } from "../api/profile-api";
import type { ProfileResponseDTO } from "../model";

export const getProfileServerFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProfileResponseDTO | null> => {
    await devDelay();

    const profileApi = await createProtectedServerApiClientInstance(ProfileApi);

    const profile = await profileApi.getProfile();

    return profile ?? null;
  },
);
