import { useState } from "react";

import { CheckIcon } from "@/shared/icons/check-icon";
import { ChevronsUpDownIcon } from "@/shared/icons/chevrons-up-down-icon";
import { PlusIcon } from "@/shared/icons/plus-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/ui/command";
import { Heading } from "@/shared/ui/heading";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import { useGetOrganizationsSuspenseQuery } from "../api/use-get-organizations-suspense-query";
import { getFallbackLogoOrganization } from "../lib/get-fallback-logo-organization";
import type { OrganizationDomain } from "../model/organization-domain";

export function OrganizationSwitcher() {
  const { data: organizations } = useGetOrganizationsSuspenseQuery();
  const [selectedOrganization, setSelectedOrganization] =
    useState<OrganizationDomain | null>(organizations[0] ?? null);
  const [isOpen, setIsOpen] = useState(false);

  function handleSelectOrganization(organization: OrganizationDomain) {
    setSelectedOrganization(organization);
    setIsOpen(false);
  }

  const triggerClassName = "h-14.5 w-full justify-start gap-3 !px-2 py-1";

  if (!selectedOrganization) {
    return (
      <Button className={triggerClassName} variant="outline">
        <div className="bg-muted flex size-10 items-center justify-center rounded-md">
          <PlusIcon className="size-5" />
        </div>
        <span>Создать организацию</span>
      </Button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className={triggerClassName}
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="organization-switcher-list"
        >
          {selectedOrganization && (
            <Avatar className="size-10 rounded-md">
              <AvatarImage src={selectedOrganization.logoUrl ?? undefined} />
              <AvatarFallback>
                {getFallbackLogoOrganization(selectedOrganization)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Организация</span>
            <Heading as="h6" className="mt-0.5 truncate leading-none">
              {selectedOrganization?.name}
            </Heading>
          </div>
          <ChevronsUpDownIcon
            className="text-muted-foreground/80 ml-auto"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Поиск организации..." />
          <CommandList>
            <CommandEmpty>Организация не найдена</CommandEmpty>
            <CommandGroup>
              {organizations.map((organization) => (
                <CommandItem
                  key={organization.id}
                  value={organization.name}
                  onSelect={() => handleSelectOrganization(organization)}
                >
                  <Avatar className="size-10 rounded-md">
                    <AvatarImage src={organization.logoUrl ?? undefined} />
                    <AvatarFallback>
                      {getFallbackLogoOrganization(organization)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{organization.name}</span>
                  {selectedOrganization?.id === organization.id && (
                    <CheckIcon className="ml-auto" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <Button className="w-full justify-start" variant="ghost">
                <PlusIcon />
                <span>Создать организацию</span>
              </Button>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
