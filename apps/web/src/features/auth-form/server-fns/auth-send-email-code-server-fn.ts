import { createServerFn } from "@tanstack/react-start";

import { CommonUIMessages } from "@/shared/constants/common-ui-messages";
import { devDelay } from "@/shared/lib/dev-delay";
import { createServerApiClientInstance } from "@/shared/services/api/create-server-api-client-instance";

import { AuthFormApi } from "../api/auth-form-api";
import { getAuthEmailVerificationIntentConfigServerFn } from "../config/auth-email-verification-intent-config";
import { AuthFormUIMessages } from "../constants/auth-form-ui-messages";
import { AuthEmailVerificationIntentService } from "../lib/auth-email-verification-intent-service";
import { authEmailFormSchema } from "../model/auth-email-form-schema";

export const authSendEmailCodeServerFn = createServerFn({ method: "POST" })
  .inputValidator(authEmailFormSchema)
  .handler(async ({ data }) => {
    await devDelay();

    try {
      const authFormApi = createServerApiClientInstance(AuthFormApi);
      const response = await authFormApi.sendVerificationCode({
        body: {
          email: data.email,
        },
      });

      if (!response) {
        throw new Error(AuthFormUIMessages.EMAIL_CODE_SEND_ERROR);
      }

      const authEmailVerificationIntentService = new AuthEmailVerificationIntentService(
        getAuthEmailVerificationIntentConfigServerFn(),
      );

      const token = await authEmailVerificationIntentService.generateToken({
        email: data.email,
        sentAt: Date.now(),
      });

      authEmailVerificationIntentService.setTokenCookie(token);

      return true;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);

      throw new Error(CommonUIMessages.UNKNOWN_ERROR);
    }
  });
