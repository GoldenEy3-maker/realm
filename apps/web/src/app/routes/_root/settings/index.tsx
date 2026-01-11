import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="main-subgrid-container">
      <div className="col-span-full">Hello "/_root/settings/"!</div>
    </main>
  );
}
