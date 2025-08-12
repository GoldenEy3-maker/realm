import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import type { ExtractQueryOptionsParamsWithoutFetcher } from "@/shared/types/extract-query-options-params-without-fetcher";

import { getTaskBySlugServerFn } from "../server-fns/get-task-by-slug";
import type { GetTaskBySlugQueryOptionsParams } from "./get-task-by-slug-query-options";
import { getTaskBySlugQueryOptions } from "./get-task-by-slug-query-options";

interface UseTaskBySlugSuspenseQueryParams
  extends ExtractQueryOptionsParamsWithoutFetcher<GetTaskBySlugQueryOptionsParams> {}

export function useTaskBySlugSuspenseQuery(
  params: UseTaskBySlugSuspenseQueryParams,
) {
  const serverFn = useServerFn(getTaskBySlugServerFn);
  return useSuspenseQuery(
    getTaskBySlugQueryOptions({ fetcher: serverFn, ...params }),
  );
}
