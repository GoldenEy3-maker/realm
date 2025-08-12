import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-key-map";
import { noop } from "@/shared/lib/noop";

import { type AuthFormSchema } from "../model/auth-form-schema";
import { authVerifyEmailCodeServerFn } from "../server-fns/auth-verify-email-code";

interface UseVerifyEmailCodeMutationParams {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useVerifyEmailCodeMutation({
  onSuccess = noop,
  onError = noop,
}: UseVerifyEmailCodeMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuthFormSchema) => authVerifyEmailCodeServerFn({ data }),
    onSuccess: (data) => {
      queryClient.resetQueries({ queryKey: [QueryKeyMap.SESSION] });
      queryClient.setQueryData([QueryKeyMap.SESSION], () => ({
        user: { id: data.id, email: data.email, username: data.username },
        version: data.tokenVersion,
      }));
      onSuccess();
    },
    onError,
  });
}
