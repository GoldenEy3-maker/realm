import {
  type MutationFunction,
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface UseOptimisticMutationProps<TData = unknown, TVariables = void, TQueryFnData = unknown> {
  mutationFn: MutationFunction<TData, TVariables>;
  queryKey: QueryKey;
  updater: (input: TQueryFnData | undefined) => TQueryFnData | undefined;
  invalidates: QueryKey;
}

export function useOptimisticMutation<TData = unknown, TVariables = void>({
  mutationFn,
  queryKey,
  updater,
  invalidates,
}: UseOptimisticMutationProps<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const snapshot = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, updater);

      return () => {
        queryClient.setQueryData(queryKey, snapshot);
      };
    },
    onError: (_err, _variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: invalidates,
      });
    },
  });
}
