import { type QueryKey } from "@tanstack/react-query";

import { type SuspenceCrumb } from "../model/suspence-crumb";

export function createSuspenceCrumb<
  TData = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(crumb: SuspenceCrumb<TData, TQueryKey>) {
  return crumb;
}
