import { QueryKeyMap } from "@/shared/constants/query-key-map";
import { createQuery } from "@/shared/lib/tanstack-query/create-query";

import { authServerFn } from "../server/auth-server-fn";

export const [
  getSessionQueryOptions,
  { useSuspenseQuery: useGetSessionSuspenseQuery, useQuery: useGetSessionQuery },
] = createQuery(authServerFn, [QueryKeyMap.SESSION], (serverFn, { signal }) =>
  serverFn({ signal }),
);
