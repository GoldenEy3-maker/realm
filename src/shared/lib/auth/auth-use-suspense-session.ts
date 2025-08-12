import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { getSessionQueryOptions } from "./auth-get-session-query-options";
import { authServerFn } from "./auth-server-fn";

export function useSuspenseSession() {
  const serverFn = useServerFn(authServerFn);
  return useSuspenseQuery(getSessionQueryOptions({ fetcher: serverFn }));
}
