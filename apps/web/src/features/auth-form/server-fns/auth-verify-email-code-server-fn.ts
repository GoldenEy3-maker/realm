import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start/server";

import { devDelay } from "@/shared/lib/dev-delay";
import { createServerApiClientInstance } from "@/shared/services/api/create-server-api-client-instance";
import { getAuthConfigServerFn } from "@/shared/services/auth/config";
import { AuthService } from "@/shared/services/auth/server";

import { AuthFormApi } from "../api/auth-form-api";
import { getAuthEmailVerificationIntentConfigServerFn } from "../config/auth-email-verification-intent-config";
import { AuthFormUIMessages } from "../constants/auth-form-ui-messages";
import { authFormSchema } from "../model/auth-form-schema";

export const authVerifyEmailCodeServerFn = createServerFn({ method: "POST" })
  .inputValidator(authFormSchema)
  .handler(async ({ data }) => {
    await devDelay();

    const authFormApi = createServerApiClientInstance(AuthFormApi);

    const response = await authFormApi.verifyEmailCode({
      body: {
        email: data.email,
        code: data.code,
      },
    });

    if (!response) {
      throw new Error(AuthFormUIMessages.EMAIL_CODE_VERIFY_ERROR);
    }

    const authService = new AuthService(getAuthConfigServerFn());

    await authService.setSessionTokens({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    deleteCookie(getAuthEmailVerificationIntentConfigServerFn().cookieName);

    return true;
  });
