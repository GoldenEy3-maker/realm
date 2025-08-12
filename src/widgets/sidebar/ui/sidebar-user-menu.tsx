import { Link } from "@tanstack/react-router";

import {
  getProfileAvatarFallback,
  useGetProfileSuspenseQuery,
} from "@/entities/profile";
import { ThemeTabs } from "@/features/theme";
import { BellOffIcon } from "@/shared/icons/bell-off-icon";
import { HelpCircleIcon } from "@/shared/icons/help-circle-icon";
import { LogOutIcon } from "@/shared/icons/log-out-icon";
import { MoonStarsIcon } from "@/shared/icons/moon-stars-icon";
import { SettingsIcon } from "@/shared/icons/settings-icon";
import { useProtectedSuspenseSession } from "@/shared/lib/auth";
import { cn } from "@/shared/lib/cn";
import type { ComponentPropsWithoutChildren } from "@/shared/types/component-props-without-children";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Separator } from "@/shared/ui/separator";

interface SidebarUserMenuProps
  extends ComponentPropsWithoutChildren<"button"> {}

export function SidebarUserMenu({ className, ...props }: SidebarUserMenuProps) {
  const session = useProtectedSuspenseSession();
  const { data: profile } = useGetProfileSuspenseQuery();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "data-[state=open]:bg-accent dark:data-[state=open]:bg-accent/50 h-auto justify-start gap-3 text-left data-[state=open]:rounded-t-none",
            className,
          )}
          {...props}
        >
          <Avatar>
            <AvatarImage src={profile?.avatarUrl ?? undefined} />
            <AvatarFallback>{getProfileAvatarFallback(profile)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <p className="leading-none">Данил</p>
            <span className="text-muted-foreground text-sm leading-none">
              {session.user.email}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={0}
        align="start"
        className="bg-accent dark:bg-accent/50 w-[var(--radix-popover-trigger-width)] rounded-none rounded-t-md border-none p-0.5 shadow-none"
      >
        <div className="bg-popover flex flex-col rounded-sm py-2 shadow-sm">
          <Button
            variant="ghost"
            className="text-muted-foreground h-10 justify-start rounded-none"
          >
            <MoonStarsIcon />
            <span>
              Перейти в режим <span className="text-foreground">сон</span>
            </span>
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground h-10 justify-start rounded-none"
          >
            <BellOffIcon />
            <span>Отключить уведомления</span>
          </Button>
          <Separator className="mx-auto my-1 !w-[calc(100%-1rem)]" />
          <Button
            variant="ghost"
            className="text-muted-foreground h-10 justify-start rounded-none"
            asChild
          >
            <Link to="/settings">
              <SettingsIcon />
              <span>Настройки</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground h-10 justify-start rounded-none"
            asChild
          >
            <Link to="/help">
              <HelpCircleIcon />
              <span>Помощь</span>
            </Link>
          </Button>
          <ThemeTabs className="[&_[data-slot=tabs-trigger]]:text-muted-foreground [&_[data-slot=tabs-trigger]]:data-[state=active]:text-foreground mt-1 w-full px-3 [&_[data-slot=tabs-list]]:w-full" />
          <Separator className="mx-auto my-1 !w-[calc(100%-1rem)]" />
          <Button
            variant="ghost"
            className="text-muted-foreground h-auto justify-start rounded-none"
          >
            <LogOutIcon />
            <span>Выйти</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
