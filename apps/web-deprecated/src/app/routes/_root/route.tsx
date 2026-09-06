import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getSessionQueryOptions } from "@/shared/services/auth/api";
import { Header } from "@/widgets/header/ui";
import { Sidebar } from "@/widgets/sidebar/ui";

export const Route = createFileRoute("/_root")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(getSessionQueryOptions());

    if (!session) throw redirect({ to: "/auth" });

    return { session };
  },
});

function RouteComponent() {
  return (
    <div className="grid-container flex-1 grid-rows-[auto_1fr_auto]">
      <Sidebar className="row-span-full" />
      <div className="full-width-subgrid-container row-span-full grid-rows-subgrid">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
