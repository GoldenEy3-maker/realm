import { Link, linkOptions } from "@tanstack/react-router";

import { OrganizationSwitcher } from "@/entities/organization";
import { SearchCommandDialog } from "@/features/search";
import { PanelsTopLeftIcon } from "@/shared/hooks/panels-top-left-icon";
import { NotepadTextIcon } from "@/shared/icons/notepad-text-icon";
import { cn } from "@/shared/lib/cn";
import type { ComponentPropsWithoutChildren } from "@/shared/types/component-props-without-children";
import { Button } from "@/shared/ui/button";

import { SidebarUserMenu } from "./sidebar-user-menu";

interface SidebarProps extends ComponentPropsWithoutChildren<"aside"> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const links = linkOptions([
    {
      to: "/",
      activeOptions: { exact: true },
      label: "Главная",
      icon: <PanelsTopLeftIcon />,
    },
    {
      to: "/tasks",
      activeOptions: { exact: false },
      label: "Задачи",
      icon: <NotepadTextIcon />,
    },
    {
      to: "/projects",
      activeOptions: { exact: false },
      label: "Проекты",
      icon: <NotepadTextIcon />,
    },
  ]);

  return (
    <aside
      className={cn(
        "subgrid-container col-[sidebar] auto-rows-auto py-3 pl-3",
        className,
      )}
      {...props}
    >
      <div className="col-span-full flex flex-col gap-2">
        <OrganizationSwitcher />
        <SearchCommandDialog />
        <nav className="mt-4 flex flex-col">
          {links.map((link) => (
            <Button
              key={link.to}
              variant="ghost"
              className="text-muted-foreground data-[status=active]:text-foreground h-10 justify-start"
              asChild
            >
              <Link to={link.to} activeOptions={link.activeOptions}>
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <SidebarUserMenu className="mt-auto" />
      </div>
    </aside>
  );
}
