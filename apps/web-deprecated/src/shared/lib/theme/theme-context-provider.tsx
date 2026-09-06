import { useCallback, useEffect, useMemo, useState } from "react";

import { MEDIA_PREFERS_DARK_COLOR_SCHEMA } from "@/shared/constants/media-prefers-dark-color-schema";

import { disableAnimation } from "../disable-animation";
import { getSystemTheme } from "./get-system-theme";
import { getTheme } from "./get-theme";
import { saveThemeToLS } from "./save-theme-to-LS";
import { ThemeContext } from "./theme-context";
import { ThemeMap } from "./theme-map";
import { ThemeScript } from "./theme-script";
import { THEME_STORAGE_KEY } from "./theme-storage-key";

const systemThemes = [ThemeMap.LIGHT, ThemeMap.DARK];

interface ThemeProviderProps {
  defaultTheme?: ThemeMap;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  disableTransitionOnChange = false,
}: React.PropsWithChildren<ThemeProviderProps>) {
  const [theme, setThemeState] = useState<ThemeMap>(
    () => (getTheme(THEME_STORAGE_KEY) || defaultTheme) as ThemeMap,
  );
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    theme === ThemeMap.SYSTEM ? getSystemTheme() : theme,
  );

  const applyTheme = useCallback(
    (theme: ThemeMap) => {
      let resolved = theme;
      if (!resolved) return;

      if (theme === ThemeMap.SYSTEM) {
        resolved = getSystemTheme();
      }

      const enable = disableTransitionOnChange ? disableAnimation() : null;
      const value = ThemeMap[resolved.toUpperCase() as keyof typeof ThemeMap];
      const root = document.documentElement;

      root.classList.remove(...systemThemes);

      if (value) {
        root.classList.add(value);
        root.style.colorScheme = value;
      }

      enable?.();
    },
    [disableTransitionOnChange],
  );

  const setTheme = useCallback((value: ThemeMap | ((prevTheme: ThemeMap) => ThemeMap)) => {
    if (typeof value === "function") {
      setThemeState((prevTheme) => {
        const newTheme = value(prevTheme);
        saveThemeToLS(THEME_STORAGE_KEY, newTheme);
        return newTheme;
      });
    } else {
      setThemeState(value);
      saveThemeToLS(THEME_STORAGE_KEY, value);
    }
  }, []);

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);

      if (theme === ThemeMap.SYSTEM) {
        applyTheme(ThemeMap.SYSTEM);
      }
    },
    [applyTheme, theme],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_PREFERS_DARK_COLOR_SCHEMA);
    mediaQuery.addEventListener("change", handleMediaQuery);
    handleMediaQuery(mediaQuery);
    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

  const handleStorage = useCallback(
    (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY) {
        return;
      }

      if (!e.newValue) {
        setTheme(defaultTheme);
      } else {
        setThemeState(e.newValue as ThemeMap);
      }
    },
    [setTheme, defaultTheme],
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [handleStorage]);

  useEffect(() => {
    applyTheme(theme);
  }, [applyTheme, theme]);

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme: theme === ThemeMap.SYSTEM ? resolvedTheme : theme,
    }),
    [theme, setTheme, resolvedTheme],
  );

  return (
    <ThemeContext value={providerValue}>
      <ThemeScript
        defaultTheme={defaultTheme}
        storageKey={THEME_STORAGE_KEY}
        systemThemes={systemThemes}
      />
      {children}
    </ThemeContext>
  );
}
