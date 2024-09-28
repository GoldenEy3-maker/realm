import { NavLink } from "@remix-run/react";
import { RoutesMap } from "../lib";
import { Button } from "./button";
import { Icons } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const links = [
  {
    href: RoutesMap.Dashborad,
    icon: Icons.Home,
    srOnly: "Главная",
    tooltip: "Главная",
  },
  {
    href: RoutesMap.Models,
    icon: Icons.Cube,
    srOnly: "Модели",
    tooltip: "Модели",
  },
];

export function Navigation() {
  return (
    <nav className="sticky inset-y-0 left-0 flex flex-col p-2 border-r">
      <ul className="space-y-2">
        <TooltipProvider delayDuration={300}>
          {links.map((link) => (
            <li key={link.href}>
              <Button asChild variant="ghost" size="icon">
                <NavLink
                  end
                  to={link.href}
                  className={({ isActive }) =>
                    isActive ? "text-primary" : ""
                  }>
                  <span className="text-xl">
                    <link.icon />
                  </span>
                  <span className="sr-only">{link.srOnly}</span>
                </NavLink>
              </Button>
            </li>
          ))}
        </TooltipProvider>
      </ul>
    </nav>
  );
}
