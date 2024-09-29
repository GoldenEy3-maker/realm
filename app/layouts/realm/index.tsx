import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Footer, Header, MainSidebar } from "widgets/realm";
import { useNProgress } from "shared/realm/hooks";

import "nprogress/nprogress.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout() {
  useNProgress({ showSpinner: false });

  return (
    <div className="flex min-h-svh">
      <MainSidebar />
      <div className="flex-1">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
