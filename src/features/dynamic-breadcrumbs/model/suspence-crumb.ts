import { type QueryKey, type UseQueryOptions } from "@tanstack/react-query";
import { type LinkOptions } from "@tanstack/react-router";

export interface SuspenceCrumb<
  TData = unknown,
  TQueryKey extends QueryKey = QueryKey,
> {
  label: keyof TData;
  href?: LinkOptions["to"];
  params?: Partial<
    Record<
      keyof Extract<LinkOptions["params"], Record<string, unknown>>,
      keyof TData
    >
  >;
  queryOptions: UseQueryOptions<TData, Error, TData, TQueryKey>;
}
