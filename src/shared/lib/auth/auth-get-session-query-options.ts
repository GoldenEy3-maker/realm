import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-key-map";
import type { GetQueryOptionsParamsWithFetcher } from "@/shared/types/get-query-options-params-with-fetcher";

import { authServerFn } from "./auth-server-fn";

interface GetSessionQueryOptionsParams
  extends Partial<GetQueryOptionsParamsWithFetcher<typeof authServerFn>> {}

export function getSessionQueryOptions(params?: GetSessionQueryOptionsParams) {
  const fetcher = params?.fetcher ?? authServerFn;

  return queryOptions({
    queryKey: [QueryKeyMap.SESSION],
    queryFn: fetcher,
  });
}
