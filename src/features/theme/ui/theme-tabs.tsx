import { ThemeMap, useTheme } from "@/shared/lib/theme";
import type { ComponentPropsWithoutChildren } from "@/shared/types/component-props-without-children";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

interface ThemeTabsProps
  extends Omit<
    ComponentPropsWithoutChildren<typeof Tabs>,
    "value" | "onValueChange"
  > {}

export function ThemeTabs(props: ThemeTabsProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs
      value={theme}
      onValueChange={(value) => setTheme(value as ThemeMap)}
      {...props}
    >
      <TabsList>
        <TabsTrigger value={ThemeMap.LIGHT}>Светлая</TabsTrigger>
        <TabsTrigger value={ThemeMap.DARK}>Темная</TabsTrigger>
        <TabsTrigger value={ThemeMap.SYSTEM}>Системная</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
