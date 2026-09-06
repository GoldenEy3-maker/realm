import { type ValueOf } from "../../types/value-of";

export const ThemeMap = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export type ThemeMap = ValueOf<typeof ThemeMap>;
