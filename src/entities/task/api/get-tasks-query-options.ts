import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-keys";

import { taskDtoToDomainArray } from "../lib/task-mappers";
import { getTasksServerFn } from "../server-fns/get-tasks";

interface GetTasksQueryOptionsParams {
  limit?: number;
}

export function getTasksQueryOptions(
  params: GetTasksQueryOptionsParams = { limit: 20 },
) {
  return queryOptions({
    queryKey: [QueryKeyMap.Tasks, params.limit],
    queryFn: async ({ signal }) => {
      const dtoData = await getTasksServerFn({
        data: { limit: params.limit },
        signal,
      });
      return taskDtoToDomainArray(dtoData);
    },
  });
}
