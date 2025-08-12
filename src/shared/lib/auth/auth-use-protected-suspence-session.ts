import { redirect } from "@tanstack/react-router";

import { useSuspenseSession } from "./auth-use-suspense-session";

export function useProtectedSuspenseSession() {
  const { data: session } = useSuspenseSession();

  if (!session) throw redirect({ to: "/auth" });

  return session;
}
