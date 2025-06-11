import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-keys";

import { getTaskBySlugServerFn } from "../server-fns/get-task-by-slug";

export function getTaskBySlugQueryOptions(slug: string) {
  return queryOptions({
    queryKey: [QueryKeyMap.Tasks, slug],
    queryFn: ({ signal }) => getTaskBySlugServerFn({ data: { slug }, signal }),
  });
}
