import { type QueryFunction, useSuspenseQuery } from "@tanstack/react-query";

import { type SuspenceCrumb } from "../model/suspence-crumb";
import { DynamicBreadcrmbsStaticItem } from "./dynamic-breadcrumbs-static-item";

interface DynamicBreadcrumbsSuspenseItemProps<TData = unknown>
  extends SuspenceCrumb<TData> {}

export function DynamicBreadcrumbsSuspenseItem<TData = unknown>({
  label,
  href,
  params,
  queryOptions,
}: DynamicBreadcrumbsSuspenseItemProps<TData>) {
  const data = useSuspenseQuery({
    ...queryOptions,
    // Fallback queryFn is needed because queryOptions from loaderData loses queryFn during serialization
    // This is expected behavior as functions cannot be serialized between server and client
    queryFn: (queryOptions.queryFn ??
      (() => Promise.resolve({}))) as QueryFunction<TData>,
  });

  const linkParams = params
    ? {
        params: Object.fromEntries(
          Object.entries(params).map(([key, value]) => [
            key,
            String((data.data as TData)[value as keyof TData]),
          ]),
        ),
      }
    : undefined;

  return (
    <DynamicBreadcrmbsStaticItem
      {...{
        label: String((data.data as TData)[label]),
        href,
        params: linkParams?.params,
      }}
    />
  );
}
