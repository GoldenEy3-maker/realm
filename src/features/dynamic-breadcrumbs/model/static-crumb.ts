import { type LinkOptions } from "@tanstack/react-router";

export interface StaticCrumb {
  label: string | undefined;
  href?: LinkOptions["to"];
  params?: LinkOptions["params"];
}
