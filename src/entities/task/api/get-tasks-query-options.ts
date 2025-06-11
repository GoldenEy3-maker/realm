import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-keys";

import { getTasksServerFn } from "../server-fns/get-tasks";

interface GetTasksQueryOptionsParams {
  limit?: number;
}

export function getTasksQueryOptions(
  params: GetTasksQueryOptionsParams = { limit: 20 },
) {
  return queryOptions({
    queryKey: [QueryKeyMap.Tasks, params.limit],
    queryFn: ({ signal }) =>
      getTasksServerFn({ data: { limit: params.limit }, signal }),
  });
}
