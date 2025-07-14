import { IS_SERVER } from "@/shared/constants/is-server";

export function getTheme(key: string) {
  if (IS_SERVER) return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    console.error(e);
    // Unsupported
  }
  return theme;
}
