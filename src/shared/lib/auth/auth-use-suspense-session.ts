import { useSuspenseQuery } from "@tanstack/react-query";

import { getSessionQueryOptions } from "./auth-get-session-query-options";

export function useSuspenseSession() {
  return useSuspenseQuery(getSessionQueryOptions());
}
