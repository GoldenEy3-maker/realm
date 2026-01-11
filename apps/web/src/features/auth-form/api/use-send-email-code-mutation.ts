import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { noop } from "@/shared/lib/noop";

import { AuthFormUIMessages } from "../constants/auth-form-ui-messages";
import { type AuthEmailFormSchema } from "../model/auth-email-form-schema";
import { authSendEmailCodeServerFn } from "../server-fns/auth-send-email-code-server-fn";

interface UseSendEmailCodeMutationParams {
  onSuccess?: (variables: AuthEmailFormSchema) => void;
  getEmail: () => string;
}

export function useSendEmailCodeMutation({
  onSuccess = noop,
  getEmail,
}: UseSendEmailCodeMutationParams) {
  const serverFn = useServerFn(authSendEmailCodeServerFn);

  return useMutation({
    mutationFn: (variables: AuthEmailFormSchema) => serverFn({ data: variables }),
    meta: {
      successMessage: () => AuthFormUIMessages.EMAIL_CODE_SEND_SUCCESSFULLY(getEmail()),
    },
    onSuccess: (_data, variables) => {
      onSuccess(variables);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
