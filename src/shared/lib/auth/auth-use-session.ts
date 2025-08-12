import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { getSessionQueryOptions } from "./auth-get-session-query-options";
import { authServerFn } from "./auth-server-fn";

export function useSession() {
  const serverFn = useServerFn(authServerFn);
  return useQuery(getSessionQueryOptions({ fetcher: serverFn }));
}
