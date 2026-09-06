import { TanStackDevtools } from "@tanstack/react-devtools";
import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { seo } from "@/app/seo";
import appCss from "@/app/styles/app.css?url";
import { NavigationLoadingBar } from "@/features/navigation-loading-bar/ui";
import { MotionConfig } from "@/shared/lib/motion";
import { TanStackQueryDevtoolsReactPlugin } from "@/shared/lib/tanstack-query/devtools-react-plugin";
import { ThemeProvider } from "@/shared/lib/theme";
import { SonnerToaster } from "@/shared/ui/sonner-toaster";

import { DefaultCatchBoundary } from "../default-catch-boundary";
import { NotFound } from "../not-found";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionConfig>
      <ThemeProvider disableTransitionOnChange>
        <html lang="ru" suppressHydrationWarning>
          <head>
            <HeadContent />
          </head>
          <body suppressHydrationWarning>
            <NavigationLoadingBar />
            <div className="flex min-h-svh flex-col">{children}</div>
            <SonnerToaster richColors position="bottom-center" />
            <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtoolsReactPlugin(),
              ]}
            />
            <Scripts />
          </body>
        </html>
      </ThemeProvider>
    </MotionConfig>
  );
}
