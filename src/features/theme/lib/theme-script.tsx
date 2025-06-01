import { Theme } from "../model/theme";
import { createPortal } from "react-dom";

function injectThemeScript(
  defaultTheme: Theme,
  storageKey: string,
  systemThemes: Theme[],
) {
  const root = document.documentElement;

  function updateDOM(theme: Theme) {
    root.classList.remove(...systemThemes);
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  try {
    const themeName = localStorage.getItem(storageKey) || defaultTheme;
    const isSystem = themeName === "system";
    const theme = isSystem ? getSystemTheme() : themeName;
    updateDOM(theme as Theme);
  } catch (e) {
    console.error(e);
    // Unsupported
  }
}

interface ThemeScriptProps {
  defaultTheme: Theme;
  storageKey: string;
  systemThemes: Theme[];
}

export function ThemeScript({
  defaultTheme,
  storageKey,
  systemThemes,
}: ThemeScriptProps) {
  const scriptArgs = JSON.stringify([
    defaultTheme,
    storageKey,
    systemThemes,
  ]).slice(1, -1);

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
