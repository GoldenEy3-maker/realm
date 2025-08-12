import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="subgrid-container">
      <div className="col-span-full">Hello "/_root/projects/"!</div>
    </main>
  );
}
