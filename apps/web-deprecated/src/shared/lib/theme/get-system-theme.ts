import { IS_SERVER } from "@/shared/constants/is-server";
import { MEDIA_PREFERS_DARK_COLOR_SCHEMA } from "@/shared/constants/media-prefers-dark-color-schema";

import { type ThemeMap } from "./theme-map";

export function getSystemTheme(
  e?: MediaQueryList | MediaQueryListEvent,
): `${typeof ThemeMap.LIGHT}` | `${typeof ThemeMap.DARK}` {
  if (IS_SERVER) return "light";
  if (!e) e = matchMedia(MEDIA_PREFERS_DARK_COLOR_SCHEMA);
  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
}
