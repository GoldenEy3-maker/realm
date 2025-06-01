import {
  createContext,
  PropsWithChildren,
  use,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Theme } from "./theme";
import { THEME_STORAGE_KEY } from "../constants/theme-storage-key";
import { ThemeScript } from "../lib/theme-script";
import { ThemesMap } from "../constants/themes-map";
import { getTheme } from "../lib/get-theme";
import { getSystemTheme } from "../lib/get-system-theme";
import { saveThemeToLS } from "../lib/save-theme-to-ls";
import { MEDIA_PREFERS_COLOR_SCHEMA } from "@/shared/constants/media-prefers-color-schema";

const systemThemes = [ThemesMap.LIGHT, ThemesMap.DARK];

interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: `${typeof ThemesMap.LIGHT}` | `${typeof ThemesMap.DARK}`;
}

const ThemeContext = createContext<ThemeContextState | null>(null);

interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (getTheme(THEME_STORAGE_KEY) || defaultTheme) as Theme,
  );
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    theme === ThemesMap.SYSTEM ? getSystemTheme() : theme,
  );

  const applyTheme = useCallback((theme: Theme) => {
    let resolved = theme;
    if (!resolved) return;

    if (theme === ThemesMap.SYSTEM) {
      resolved = getSystemTheme();
    }

    const value = ThemesMap[resolved.toUpperCase() as keyof typeof ThemesMap];
    const root = document.documentElement;

    root.classList.remove(...systemThemes);

    if (value) {
      root.classList.add(value);
      root.style.colorScheme = value;
    }
  }, []);

  const setTheme = useCallback(
    (value: Theme | ((prevTheme: Theme) => Theme)) => {
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
    },
    [],
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);

      if (theme === ThemesMap.SYSTEM) {
        applyTheme(ThemesMap.SYSTEM);
      }
    },
    [applyTheme, theme],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_PREFERS_COLOR_SCHEMA);
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
        setThemeState(e.newValue as Theme);
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
      resolvedTheme: theme === ThemesMap.SYSTEM ? resolvedTheme : theme,
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

export function useTheme() {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
