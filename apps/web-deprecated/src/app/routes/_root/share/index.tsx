import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/share/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_root/share/"!</div>;
}
