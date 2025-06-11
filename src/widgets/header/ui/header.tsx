import { DynamicBreadcrumbs } from "@/features/dynamic-breadcrumbs";

export function Header() {
  return (
    <header className="subgrid-container">
      <h3 className="col-span-full">Header</h3>
      <DynamicBreadcrumbs className="col-span-full" />
    </header>
  );
}
