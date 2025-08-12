import { redirect } from "@tanstack/react-router";

import { useGetProfileSuspenseQuery } from "./use-get-profile-suspence-query";

export function useProtectedGetProfileSuspenseQuery() {
  const { data: profile } = useGetProfileSuspenseQuery();

  if (!profile) throw redirect({ to: "/auth" });

  return profile;
}
