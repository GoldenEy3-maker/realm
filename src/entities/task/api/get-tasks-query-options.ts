import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-key-map";
import type { GetQueryOptionsParamsWithFetcher } from "@/shared/types/get-query-options-params-with-fetcher";

import { taskDtoToDomainArray } from "../lib/task-mappers";
import { getTasksServerFn } from "../server-fns/get-tasks";

export interface GetTasksQueryOptionsParams
  extends Partial<GetQueryOptionsParamsWithFetcher<typeof getTasksServerFn>> {
  limit?: number;
}

export function getTasksQueryOptions(params?: GetTasksQueryOptionsParams) {
  const limit = params?.limit ?? 20;
  const fetcher = params?.fetcher ?? getTasksServerFn;

  return queryOptions({
    queryKey: [QueryKeyMap.TASKS, limit],
    queryFn: async ({ signal }) => {
      const dtoData = await fetcher({
        data: { limit: limit },
        signal,
      });
      return taskDtoToDomainArray(dtoData);
    },
  });
}
