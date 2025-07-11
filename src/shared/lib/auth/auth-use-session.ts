import { useQuery } from "@tanstack/react-query";

import { getSessionQueryOptions } from "./auth-get-session-query-options";

export function useSession() {
  return useQuery(getSessionQueryOptions());
}
