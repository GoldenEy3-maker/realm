import { redirect } from "@tanstack/react-router";

import { useGetSessionSuspenseQuery } from "./get-session-query";

export function useProtectedSuspenseSession() {
  const { data: session } = useGetSessionSuspenseQuery();

  if (!session) throw redirect({ to: "/auth" });

  return session;
}
