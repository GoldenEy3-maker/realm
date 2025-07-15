import { useMutation } from "@tanstack/react-query";

import { type AuthEmailFormSchema } from "../model/auth-email-form-schema";
import { authSendEmailCodeServerFn } from "../server-fns/auth-send-email-code";

interface UseSendEmailCodeMutationParams {
  onSuccess?: () => void;
  getEmail: () => string;
}

export function useSendEmailCodeMutation({
  onSuccess,
  getEmail,
}: UseSendEmailCodeMutationParams) {
  return useMutation({
    mutationFn: (data: AuthEmailFormSchema) =>
      authSendEmailCodeServerFn({ data }),
    meta: {
      errorMessage: "Не удалось отправить код. Повторите попытку позже.",
      successMessage: `Код отправлен на ${getEmail()}`,
    },
    onSuccess,
  });
}
