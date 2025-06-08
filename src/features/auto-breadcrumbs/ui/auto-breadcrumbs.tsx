import { useMatches } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

import { cn } from "@/shared/lib/cn";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";

interface AutoBreadcrumbsProps
  extends Omit<React.ComponentProps<"nav">, "children"> {}

export function AutoBreadcrumbs({ className, ...props }: AutoBreadcrumbsProps) {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.loaderData?.crumbs)
    .flatMap(({ loaderData }) => {
      return loaderData!.crumbs;
    });

  return (
    <Breadcrumb className={cn(className)} {...props}>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <Fragment key={crumb.href}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {crumb.href ? (
                <BreadcrumbLink to={crumb.href}>{crumb.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
