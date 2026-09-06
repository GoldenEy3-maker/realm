import { QueryKeyMap } from "@/shared/constants/query-key-map";
import { createQuery } from "@/shared/lib/tanstack-query/create-query";

import { getTasksServerFn } from "../server-fns";

export const [getTasksQueryOptions, { useSuspenseQuery: useTasksSuspenseQuery }] = createQuery(
  getTasksServerFn,
  (params) => [QueryKeyMap.TASKS, params.limit],
  (serverFn, { signal }, params) => serverFn({ data: params, signal }),
);
