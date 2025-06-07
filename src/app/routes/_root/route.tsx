import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";

export const Route = createFileRoute("/_root")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid-container flex-1">
      <Sidebar />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
