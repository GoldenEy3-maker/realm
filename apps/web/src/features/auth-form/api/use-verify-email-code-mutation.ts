import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { noop } from "@/shared/lib/noop";

import { type AuthFormSchema } from "../model/auth-form-schema";
import { authVerifyEmailCodeServerFn } from "../server-fns/auth-verify-email-code-server-fn";

interface UseVerifyEmailCodeMutationParams {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useVerifyEmailCodeMutation({
  onSuccess = noop,
  onError = noop,
}: UseVerifyEmailCodeMutationParams) {
  const queryClient = useQueryClient();
  const serverFn = useServerFn(authVerifyEmailCodeServerFn);

  return useMutation({
    mutationFn: (data: AuthFormSchema) => serverFn({ data }),
    onSuccess: () => {
      queryClient.resetQueries();
      onSuccess();
    },
    onError,
  });
}
