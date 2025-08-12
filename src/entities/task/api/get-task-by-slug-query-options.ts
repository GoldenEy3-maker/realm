import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-key-map";
import type { GetQueryOptionsParamsWithFetcher } from "@/shared/types/get-query-options-params-with-fetcher";

import { taskDtoToDomain } from "../lib/task-mappers";
import { getTaskBySlugServerFn } from "../server-fns/get-task-by-slug";

export interface GetTaskBySlugQueryOptionsParams
  extends Partial<
    GetQueryOptionsParamsWithFetcher<typeof getTaskBySlugServerFn>
  > {
  slug: string;
}

export function getTaskBySlugQueryOptions(
  params: GetTaskBySlugQueryOptionsParams,
) {
  const fetcher = params.fetcher ?? getTaskBySlugServerFn;
  return queryOptions({
    queryKey: [QueryKeyMap.TASKS, params.slug],
    queryFn: async ({ signal }) => {
      const dtoData = await fetcher({ data: { slug: params.slug }, signal });
      return taskDtoToDomain(dtoData);
    },
  });
}
