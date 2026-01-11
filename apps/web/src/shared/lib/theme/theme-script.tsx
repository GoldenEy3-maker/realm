import { createPortal } from "react-dom";

import { type ThemeMap } from "@/shared/lib/theme/theme-map";

/**
 * Injects a script to manage theme changes.
 * @note Do not use any imported modules in this function.
 */
function injectThemeScript(defaultTheme: ThemeMap, storageKey: string, systemThemes: ThemeMap[]) {
  const root = document.documentElement;

  function updateDOM(theme: ThemeMap) {
    root.classList.remove(...systemThemes);
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  try {
    const themeName = localStorage.getItem(storageKey) || defaultTheme;
    const isSystem = themeName === "system";
    const theme = isSystem ? getSystemTheme() : themeName;
    updateDOM(theme as ThemeMap);
  } catch (e) {
    console.error(e);
    // Unsupported
  }
}

interface ThemeScriptProps {
  defaultTheme: ThemeMap;
  storageKey: string;
  systemThemes: ThemeMap[];
}

export function ThemeScript({ defaultTheme, storageKey, systemThemes }: ThemeScriptProps) {
  const scriptArgs = JSON.stringify([defaultTheme, storageKey, systemThemes]).slice(1, -1);

  const script = (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(${injectThemeScript.toString()})(${scriptArgs})`,
      }}
    />
  );

  if (typeof document === "undefined") {
    return script;
  }

  return createPortal(script, document.head);
}
