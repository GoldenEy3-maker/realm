import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";

export const Route = createFileRoute("/_root")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid-container bg-sidebar flex-1 grid-rows-[auto_1fr_auto]">
      <Sidebar className="row-span-full" />
      <div className="subgrid-container bg-background col-[full-width] row-span-full my-2 mr-2 grid-rows-subgrid rounded-lg py-3 shadow-sm">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
