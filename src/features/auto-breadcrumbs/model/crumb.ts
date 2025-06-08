import { LinkOptions } from "@tanstack/react-router";

export interface Crumb {
  label: string | undefined;
  href?: LinkOptions["to"];
  params?: LinkOptions["params"];
}
