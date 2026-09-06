import { redirect } from "@tanstack/react-router";

import { useGetProfileSuspenseQuery } from "@/entities/profile/api";

export function useProtectedGetProfileSuspenseQuery(
  ...args: Parameters<typeof useGetProfileSuspenseQuery>
) {
  const { data, ...rest } = useGetProfileSuspenseQuery(...args);

  if (!data) throw redirect({ to: "/auth" });

  return { data, ...rest };
}
