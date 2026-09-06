import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/sheduler/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_root/sheduler/"!</div>;
}
