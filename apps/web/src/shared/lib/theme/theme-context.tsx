import { createContext } from "react";

import type { ThemeMap } from "./theme-map";

interface ThemeContextValue {
  theme: ThemeMap;
  setTheme: (theme: ThemeMap) => void;
  resolvedTheme: `${typeof ThemeMap.LIGHT}` | `${typeof ThemeMap.DARK}`;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
