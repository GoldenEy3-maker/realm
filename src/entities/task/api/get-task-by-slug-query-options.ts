import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-keys";

import { taskDtoToDomain } from "../lib/task-mappers";
import { getTaskBySlugServerFn } from "../server-fns/get-task-by-slug";

export function getTaskBySlugQueryOptions(slug: string) {
  return queryOptions({
    queryKey: [QueryKeyMap.Tasks, slug],
    queryFn: async ({ signal }) => {
      const dtoData = await getTaskBySlugServerFn({ data: { slug }, signal });
      return taskDtoToDomain(dtoData);
    },
  });
}
