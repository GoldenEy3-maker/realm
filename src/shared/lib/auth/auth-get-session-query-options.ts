import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-keys";

import { authServerFn } from "./auth-server-fn";

export function getSessionQueryOptions() {
  return queryOptions({
    queryKey: [QueryKeyMap.Session],
    queryFn: authServerFn,
  });
}
