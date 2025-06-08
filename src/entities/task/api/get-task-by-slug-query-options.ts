import { queryOptions } from "@tanstack/react-query";

import { getTaskBySlugServerFn } from "../server-fns/get-task-by-slug";
import { TASKS_QUERY_KEY } from "./tasks-query-key";

export function getTaskBySlugQueryOptions(slug: string) {
  return queryOptions({
    queryKey: [TASKS_QUERY_KEY, slug],
    queryFn: ({ signal }) => getTaskBySlugServerFn({ data: { slug }, signal }),
  });
}
