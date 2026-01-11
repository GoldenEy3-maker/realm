import { QueryKeyMap } from "@/shared/constants/query-key-map";
import { createQuery } from "@/shared/lib/tanstack-query/create-query";

import { getTaskBySerialNumberServerFn } from "../server-fns";

export const [
  getTaskBySerialNumberQueryOptions,
  { useSuspenseQuery: useTaskBySerialNumberSuspenseQuery },
] = createQuery(
  getTaskBySerialNumberServerFn,
  (params) => [QueryKeyMap.TASKS, params.serialNumber],
  (serverFn, { signal }, params) => serverFn({ data: params, signal }),
);
