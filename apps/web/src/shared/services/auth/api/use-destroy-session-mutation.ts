import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { authDestroySessionServerFn } from "../server/auth-destroy-session-server-fn";

export const useDestroySessionMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const serverFn = useServerFn(authDestroySessionServerFn);

  return useMutation({
    mutationFn: serverFn,
    onSuccess: async () => {
      await router.navigate({ to: "/auth" });
      queryClient.resetQueries();
    },
  });
};
