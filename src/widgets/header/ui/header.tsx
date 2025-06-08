import { AutoBreadcrumbs } from "@/features/auto-breadcrumbs";

export function Header() {
  return (
    <header className="subgrid-container">
      <h3 className="col-span-full">Header</h3>
      <AutoBreadcrumbs className="col-span-full" />
    </header>
  );
}
