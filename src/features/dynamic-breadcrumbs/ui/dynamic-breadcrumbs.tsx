import { useMatches } from "@tanstack/react-router";
import { Suspense } from "react";
import { Fragment } from "react/jsx-runtime";

import { cn } from "@/shared/lib/cn";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";

import { type CombinedCrumb } from "../model/combined-crumb";
import { DynamicBreadcrmbsStaticItem } from "./dynamic-breadcrumbs-static-item";
import { DynamicBreadcrumbsSuspenseItem } from "./dynamic-breadcrumbs-suspence-item";

interface DynamicBreadcrumbsProps
  extends Omit<React.ComponentProps<"nav">, "children"> {}

export function DynamicBreadcrumbs({
  className,
  ...props
}: DynamicBreadcrumbsProps) {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.loaderData?.crumbs)
    .flatMap(({ loaderData }) => {
      return loaderData!.crumbs as CombinedCrumb[];
    });

  return (
    <Breadcrumb className={cn(className)} {...props}>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            {crumb.type === "suspense" ? (
              <Suspense fallback={<p>Loading...</p>}>
                <DynamicBreadcrumbsSuspenseItem {...crumb} />
              </Suspense>
            ) : (
              <DynamicBreadcrmbsStaticItem {...crumb} />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
