import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="subgrid-container">
      <h1 className="col-span-full">Home Page</h1>
    </main>
  );
}
