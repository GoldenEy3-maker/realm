import { type QueryKey } from "@tanstack/react-query";

import { type CombinedCrumb } from "../model/combined-crumb";
import { createStaticCrumb } from "./create-static-crumb";
import { createSuspenceCrumb } from "./create-suspence-crumb";

export function createCrumbs<
  T = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(
  crumbs: CombinedCrumb<T, TQueryKey>[],
): {
  crumbs: CombinedCrumb<T, TQueryKey>[];
} {
  return {
    crumbs: crumbs.map((crumb) => {
      if (crumb.type === "static")
        return { type: "static", ...createStaticCrumb(crumb) };
      else if (crumb.type === "suspense")
        return { type: "suspense", ...createSuspenceCrumb(crumb) };
      else throw new Error("Invalid crumb type");
    }),
  };
}
