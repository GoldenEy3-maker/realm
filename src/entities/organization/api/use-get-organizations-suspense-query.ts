import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { getOrganizationsServerFn } from "../server-fns/get-organizations-server-fn";
import { getOrganizationsQueryOptions } from "./get-organizations-query-options";

export function useGetOrganizationsSuspenseQuery() {
  const serverFn = useServerFn(getOrganizationsServerFn);

  return useSuspenseQuery(getOrganizationsQueryOptions({ fetcher: serverFn }));
}
