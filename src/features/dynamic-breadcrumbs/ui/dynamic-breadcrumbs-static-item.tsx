import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/shared/ui/breadcrumb";

import { type StaticCrumb } from "../model/static-crumb";

interface DynamicBreadcrumbsItemProps extends StaticCrumb {}

export function DynamicBreadcrmbsStaticItem({
  label,
  href,
  params,
}: DynamicBreadcrumbsItemProps) {
  return (
    <BreadcrumbItem>
      {href ? (
        // @ts-expect-error breadcrumb link params type is not compatible with link params type
        <BreadcrumbLink to={href} params={params}>
          {label}
        </BreadcrumbLink>
      ) : (
        <BreadcrumbPage>{label}</BreadcrumbPage>
      )}
    </BreadcrumbItem>
  );
}
