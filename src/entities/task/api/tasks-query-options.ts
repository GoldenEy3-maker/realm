import { queryOptions } from "@tanstack/react-query";
import { getTasks } from "../server-fns/get-tasks";

export const TASKS_QUERY_KEY = "tasks";

export function getTasksQueryOptions(limit: number) {
  return queryOptions({
    queryKey: [TASKS_QUERY_KEY, limit],
    queryFn: () => getTasks({ data: { limit } }),
  });
}
