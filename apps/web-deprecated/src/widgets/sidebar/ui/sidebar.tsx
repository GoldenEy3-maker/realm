import { Link, linkOptions } from "@tanstack/react-router";

import { CalendarDaysIcon } from "@/shared/icons/calendar-days-icon";
import { ClockV7Icon } from "@/shared/icons/clock-v7-icon";
import { HelpCircleIcon } from "@/shared/icons/help-circle-icon";
import { LayoutDashboardIcon } from "@/shared/icons/layout-dashboard-icon";
import { LogOutIcon } from "@/shared/icons/log-out-icon";
import { MessageCircleIcon } from "@/shared/icons/message-circle-icon";
import { NotepadTextIcon } from "@/shared/icons/notepad-text-icon";
import { SettingsIcon } from "@/shared/icons/settings-icon";
import { ShareV2Icon } from "@/shared/icons/share-v2-icon";
import { cn } from "@/shared/lib/cn";
import { useDestroySessionMutation } from "@/shared/services/auth/api";
import type { ComponentPropsWithoutChildren } from "@/shared/types/component-props-without-children";
import { Button } from "@/shared/ui/button";
import { RealmLogo } from "@/shared/ui/realm-logo";
import { Separator } from "@/shared/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

interface SidebarProps extends ComponentPropsWithoutChildren<"aside"> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const TOOLTIP_DELAY_DURATION = 600;

  const navGroups = [
    linkOptions([
      {
        to: "/",
        activeOptions: { exact: true },
        label: "Главная",
        icon: <LayoutDashboardIcon />,
      },
      {
        to: "/tasks",
        activeOptions: { exact: false },
        label: "Задачи",
        icon: <NotepadTextIcon />,
      },
      {
        to: "/sheduler",
        activeOptions: { exact: false },
        label: "Календарь",
        icon: <CalendarDaysIcon />,
      },
    ]),
    linkOptions([
      {
        to: "/share",
        label: "Поделиться",
        activeOptions: { exact: false },
        icon: <ShareV2Icon />,
      },
      {
        to: "/timeline",
        label: "Лента",
        activeOptions: { exact: false },
        icon: <ClockV7Icon />,
      },
      {
        to: "/chat",
        label: "Сообщения",
        activeOptions: { exact: false },
        icon: <MessageCircleIcon />,
      },
    ]),
  ];

  const destroySessionMutation = useDestroySessionMutation();

  return (
    <aside
      className={cn(
        "subgrid-container border-border col-[sidebar] auto-rows-auto border-r px-2 pt-4.5 pb-3",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <RealmLogo />
        <nav className="mt-4 flex flex-1 flex-col">
          {navGroups.map((group, index) => {
            const isLastGroup = group === navGroups.at(-1);

            return (
              <div className="flex flex-col" key={index}>
                {group.map((link) => (
                  <Tooltip delayDuration={TOOLTIP_DELAY_DURATION} key={link.to}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground data-[status=active]:text-foreground [&_svg]:size-5!"
                        aria-label={link.label}
                        asChild
                      >
                        <Link to={link.to} activeOptions={link.activeOptions}>
                          {link.icon}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{link.label}</TooltipContent>
                  </Tooltip>
                ))}
                {!isLastGroup && <Separator className="mx-auto my-4 w-[calc(100%-1rem)]!" />}
              </div>
            );
          })}
          <div className="mt-auto flex flex-col">
            <Tooltip delayDuration={TOOLTIP_DELAY_DURATION}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground data-[status=active]:text-foreground [&_svg]:size-5!"
                  aria-label="Настройки"
                  asChild
                >
                  <Link to="/settings">
                    <SettingsIcon />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Настройки
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={TOOLTIP_DELAY_DURATION}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground data-[status=active]:text-foreground mt-auto [&_svg]:size-5!"
                  aria-label="Помощь"
                  asChild
                >
                  <Link to="/help">
                    <HelpCircleIcon />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Помощь
              </TooltipContent>
            </Tooltip>
            <Separator className="mx-auto my-4 w-[calc(100%-1rem)]!" />
            <Tooltip delayDuration={TOOLTIP_DELAY_DURATION}>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive-ghost"
                  size="icon"
                  aria-label="Выйти"
                  className="[&_svg]:size-5!"
                  disabled={destroySessionMutation.isPending}
                  onClick={() => destroySessionMutation.mutate({})}
                >
                  <LogOutIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Выйти
              </TooltipContent>
            </Tooltip>
          </div>
        </nav>
      </div>
    </aside>
  );
}
