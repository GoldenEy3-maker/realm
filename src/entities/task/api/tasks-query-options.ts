import { queryOptions } from "@tanstack/react-query";
import { getTasksServerFn } from "../server-fns/get-tasks";

export const TASKS_QUERY_KEY = "tasks";

interface GetTasksQueryOptionsParams {
  limit?: number;
}

export function getTasksQueryOptions(
  params: GetTasksQueryOptionsParams = { limit: 20 }
) {
  return queryOptions({
    queryKey: [TASKS_QUERY_KEY, params.limit],
    queryFn: ({ signal }) =>
      getTasksServerFn({ data: { limit: params.limit }, signal }),
  });
}
