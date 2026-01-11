import { useMatches } from "@tanstack/react-router";
import { Suspense } from "react";

import { NotificationPopover } from "@/features/notification-popover/ui";
import { ThemeTabs } from "@/features/theme-tabs/ui";
import { Heading } from "@/shared/ui/heading";

import { HeaderProfileAvatar } from "./header-profile-avatar";
import { HeaderProfileAvatarSkeleton } from "./header-profile-avatar-skeleton";

export function Header() {
  const matches = useMatches();
  const currentRoute = matches.at(-1);
  const currentRouteLoaderData = currentRoute?.loaderData;
  const title =
    currentRouteLoaderData && "meta" in currentRouteLoaderData
      ? currentRouteLoaderData.meta.headerTitle
      : undefined;

  return (
    <header className="full-width-subgrid-container border-border border-b py-2">
      <div className="main-subgrid-container">
        <div className="col-span-full flex items-center gap-2">
          {title && (
            <Heading as="h3" className="font-medium">
              {title}
            </Heading>
          )}
          <div className="ml-auto flex items-center">
            <ThemeTabs />
            <NotificationPopover />
            <div className="ml-4">
              <Suspense fallback={<HeaderProfileAvatarSkeleton />}>
                <HeaderProfileAvatar />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
