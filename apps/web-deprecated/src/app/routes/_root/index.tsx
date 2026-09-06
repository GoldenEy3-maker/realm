import { createFileRoute } from "@tanstack/react-router";

import { createRouteLoaderMeta } from "@/shared/lib/route-loader-meta/create-route-loader-meta";
import { Heading } from "@/shared/ui/heading";

export const Route = createFileRoute("/_root/")({
  component: RouteComponent,
  loader: async () => {
    return {
      ...createRouteLoaderMeta({
        headerTitle: "Главная",
      }),
    };
  },
});

function RouteComponent() {
  return (
    <main className="main-subgrid-container">
      <Heading as="h1" className="col-span-full">
        Dashboard
      </Heading>
    </main>
  );
}
