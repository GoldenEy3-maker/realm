import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { getProfileServerFn } from "../server-fns/get-profile-server-fn";
import { getProfileQueryOptions } from "./get-profile-query-options";

export function useGetProfileSuspenseQuery() {
  const serverFn = useServerFn(getProfileServerFn);

  return useSuspenseQuery(getProfileQueryOptions({ fetcher: serverFn }));
}
