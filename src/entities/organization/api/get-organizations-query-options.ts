import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-key-map";
import type { GetQueryOptionsParamsWithFetcher } from "@/shared/types/get-query-options-params-with-fetcher";

import { organizationDtoToDomainArray } from "../lib/organization-mapper";
import { getOrganizationsServerFn } from "../server-fns/get-organizations-server-fn";

interface GetOrganizationsQueryOptionsParams
  extends GetQueryOptionsParamsWithFetcher<typeof getOrganizationsServerFn> {}

export function getOrganizationsQueryOptions(
  params?: GetOrganizationsQueryOptionsParams,
) {
  const fetcher = params?.fetcher ?? getOrganizationsServerFn;
  return queryOptions({
    queryKey: [QueryKeyMap.ORGANIZATIONS],
    queryFn: async ({ signal }) => {
      const organizationsDto = await fetcher({ signal });
      return organizationDtoToDomainArray(organizationsDto);
    },
  });
}
