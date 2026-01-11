import { QueryKeyMap } from "@/shared/constants/query-key-map";
import { createQuery } from "@/shared/lib/tanstack-query/create-query";

import { getProfileServerFn } from "../server-fns";

export const [getProfileQueryOptions, { useSuspenseQuery: useGetProfileSuspenseQuery }] =
  createQuery(getProfileServerFn, [QueryKeyMap.PROFILE], (serverFn, { signal }) =>
    serverFn({ signal }),
  );
