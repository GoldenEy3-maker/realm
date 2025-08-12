import { useMutation } from "@tanstack/react-query";

import { noop } from "@/shared/lib/noop";

import { AuthFormUIMessages } from "../constants/auth-form-ui-messages";
import { type AuthEmailFormSchema } from "../model/auth-email-form-schema";
import { authSendEmailCodeServerFn } from "../server-fns/auth-send-email-code";

interface UseSendEmailCodeMutationParams {
  onSuccess?: (variables: AuthEmailFormSchema) => void;
  getEmail: () => string;
}

export function useSendEmailCodeMutation({
  onSuccess = noop,
  getEmail,
}: UseSendEmailCodeMutationParams) {
  return useMutation({
    mutationFn: (variables: AuthEmailFormSchema) =>
      authSendEmailCodeServerFn({ data: variables }),
    meta: {
      errorMessage: AuthFormUIMessages.EMAIL_CODE_SEND_ERROR,
      successMessage: AuthFormUIMessages.EMAIL_CODE_SENT(getEmail()),
    },
    onSuccess: (_data, variables) => {
      onSuccess(variables);
    },
  });
}
