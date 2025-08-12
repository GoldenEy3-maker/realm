import { queryOptions } from "@tanstack/react-query";

import { QueryKeyMap } from "@/shared/constants/query-key-map";
import type { GetQueryOptionsParamsWithFetcher } from "@/shared/types/get-query-options-params-with-fetcher";

import { profileDtoToDomain } from "../lib/profile-mapper";
import { getProfileServerFn } from "../server-fns/get-profile-server-fn";

interface GetProfileQueryOptionsParams
  extends GetQueryOptionsParamsWithFetcher<typeof getProfileServerFn> {}

export function getProfileQueryOptions(params?: GetProfileQueryOptionsParams) {
  const fetcher = params?.fetcher ?? getProfileServerFn;
  return queryOptions({
    queryKey: [QueryKeyMap.PROFILE],
    queryFn: async ({ signal }) => {
      const profileDto = await fetcher({ signal });
      if (!profileDto) return null;
      return profileDtoToDomain(profileDto);
    },
  });
}
