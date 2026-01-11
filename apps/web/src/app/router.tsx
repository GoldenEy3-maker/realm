import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { createQueryClient } from "@/shared/lib/tanstack-query/create-query-client";

import { DefaultCatchBoundary } from "./default-catch-boundary";
import { NotFound } from "./not-found";
// Import the generated route tree
import { routeTree } from "./route-tree.gen";

// Create a new router instance
export function getRouter() {
  const queryClient = createQueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
    Wrap: (props: { children: React.ReactNode }) => {
      return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}
