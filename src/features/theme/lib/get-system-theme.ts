import { IS_SERVER } from "@/shared/constants/is-server";
import { MEDIA_PREFERS_COLOR_SCHEMA } from "@/shared/constants/media-prefers-color-schema";
import { ThemesMap } from "../constants/themes-map";

export function getSystemTheme(
  e?: MediaQueryList | MediaQueryListEvent
): `${typeof ThemesMap.LIGHT}` | `${typeof ThemesMap.DARK}` {
  if (IS_SERVER) return "light";
  if (!e) e = matchMedia(MEDIA_PREFERS_COLOR_SCHEMA);
  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
}
