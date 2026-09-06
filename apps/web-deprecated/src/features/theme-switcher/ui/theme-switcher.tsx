import { useIsClient } from "@/shared/hooks/use-is-client";
import { MonitorIcon } from "@/shared/icons/monitor-icon";
import { MoonStarsIcon } from "@/shared/icons/moon-stars-icon";
import { SunIcon } from "@/shared/icons/sun-icon";
import { ThemeMap, useTheme } from "@/shared/lib/theme";
import type { ComponentPropsWithoutChildren } from "@/shared/types/component-props-without-children";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { ThemeSwitcherSkeleton } from "./theme-switcher-skeleton";

interface ThemeSwitcherProps extends Omit<
  ComponentPropsWithoutChildren<typeof Tabs>,
  "value" | "onValueChange"
> {}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
  const isClient = useIsClient();
  const { theme, setTheme } = useTheme();

  if (!isClient) return <ThemeSwitcherSkeleton />;

  return (
    <Tabs value={theme} onValueChange={(value) => setTheme(value as ThemeMap)} {...props}>
      <TabsList>
        <TabsTrigger className="size-11" value={ThemeMap.DARK} aria-label="Темная тема">
          <MoonStarsIcon />
        </TabsTrigger>
        <TabsTrigger className="size-11" value={ThemeMap.LIGHT} aria-label="Светлая тема">
          <SunIcon />
        </TabsTrigger>
        <TabsTrigger className="size-11" value={ThemeMap.SYSTEM} aria-label="Системная тема">
          <MonitorIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
