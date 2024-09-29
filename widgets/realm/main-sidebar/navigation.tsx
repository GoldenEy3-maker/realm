import { NavLink } from "@remix-run/react";
import { IconType } from "react-icons";
import { RoutesMap } from "shared/realm/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Button,
  Icons,
} from "shared/realm/ui";

type NavigationLink = {
  href: RoutesMap;
  icon: IconType;
  srOnly: string;
  tooltip: string;
};

const links: NavigationLink[] = [
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
  {
    href: RoutesMap.Settings,
    icon: Icons.Settings,
    srOnly: "Настройки",
    tooltip: "Настройки",
  },
];

export function Navigation() {
  return (
    <nav>
      <ul className="space-y-2">
        <TooltipProvider delayDuration={300}>
          {links.map((link) => (
            <li key={link.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon">
                    <NavLink
                      end
                      to={link.href}
                      className="aria-[current]:text-primary">
                      <span className="text-xl">
                        <link.icon />
                      </span>
                      <span className="sr-only">{link.srOnly}</span>
                    </NavLink>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{link.tooltip}</TooltipContent>
              </Tooltip>
            </li>
          ))}
        </TooltipProvider>
      </ul>
    </nav>
  );
}
