import { QueryKey } from "@tanstack/react-query";

import { SuspenceCrumb } from "../model/suspence-crumb";

export function createSuspenceCrumb<
  TData = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(crumb: SuspenceCrumb<TData, TQueryKey>) {
  return crumb;
}
