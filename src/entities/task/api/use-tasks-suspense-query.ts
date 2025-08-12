import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import type { ExtractQueryOptionsParamsWithoutFetcher } from "@/shared/types/extract-query-options-params-without-fetcher";

import { getTasksServerFn } from "../server-fns/get-tasks";
import type { GetTasksQueryOptionsParams } from "./get-tasks-query-options";
import { getTasksQueryOptions } from "./get-tasks-query-options";

interface UseTasksSuspenseQueryParams
  extends ExtractQueryOptionsParamsWithoutFetcher<GetTasksQueryOptionsParams> {}

export function useTasksSuspenseQuery(params?: UseTasksSuspenseQueryParams) {
  const serverFn = useServerFn(getTasksServerFn);
  return useSuspenseQuery(
    getTasksQueryOptions({ fetcher: serverFn, ...params }),
  );
}
