import { ValueOf } from "./value-of";

export const RoutesMap = {
  Dashborad: "/realm",
  Models: "/realm/models",
  Settings: "/realm/settings",
} as const;

export type RoutesMap = ValueOf<typeof RoutesMap>;
