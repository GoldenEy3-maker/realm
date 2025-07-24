import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-key-map";

import { authServerFn } from "./auth-server-fn";

export function getSessionQueryOptions() {
  return queryOptions({
    queryKey: [QueryKeyMap.SESSION],
    queryFn: authServerFn,
  });
}
