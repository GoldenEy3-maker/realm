import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export function createApp() {
  const queryClient = new QueryClient();

  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createApp>;
  }
}
