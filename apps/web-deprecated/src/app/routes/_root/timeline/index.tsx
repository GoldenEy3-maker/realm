import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/timeline/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_root/timeline/"!</div>;
}
