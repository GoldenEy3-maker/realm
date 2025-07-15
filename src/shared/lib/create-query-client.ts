import { MutationCache, QueryClient } from "@tanstack/react-query";

import { toast } from "@/shared/ui/sonner";

import { type QueryKeyMap } from "../constants/query-key-map";
import { callIfFunction } from "./call-if-function";
import { Logger } from "./logger";

type QueryKey = [QueryKeyMap, ...ReadonlyArray<unknown>];

declare module "@tanstack/react-query" {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
    mutationMeta: {
      successMessage?: string | ((data: unknown) => string);
      errorMessage?: string | ((error: unknown) => string);
      invalidateQuery?: QueryKey;
    };
  }
}

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
    mutationCache: new MutationCache({
      onMutate: (data) => {
        Logger.log("Mutation started", data);
      },
      onSuccess: (data, _variables, _context, mutation) => {
        Logger.log("Mutation success", data);

        if (mutation.meta?.successMessage) {
          toast.success(callIfFunction(mutation.meta.successMessage, data));
        }
      },
      onError: (error, _variables, _context, mutation) => {
        Logger.error("Mutation error", error);

        if (mutation.meta?.errorMessage) {
          toast.error(callIfFunction(mutation.meta.errorMessage, error));
        }
      },
      onSettled: (data, error, _variables, _context, mutation) => {
        Logger.log("Mutation settled", data, error);

        if (mutation.meta?.invalidateQuery) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta.invalidateQuery,
          });
        }
      },
    }),
  });

  return queryClient;
}
