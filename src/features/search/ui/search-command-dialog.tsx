import { useState } from "react";
import { useEventListener } from "usehooks-ts";

import { SearchIcon } from "@/shared/icons/search-icon";
import { Button } from "@/shared/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { KeyboardShortcut } from "@/shared/ui/keyboard-shortcut";

export function SearchCommandDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEventListener("keydown", (e) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsOpen(true);
    }
  });

  return (
    <>
      <Button
        variant="secondary"
        className="text-muted-foreground h-10 justify-start shadow-sm"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon />
        <span>Поиск</span>
        <KeyboardShortcut className="ml-auto">
          <span className="text-xs">⌘</span>K
        </KeyboardShortcut>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Поиск..." />
        <CommandList>
          <CommandEmpty>Ничего не найдено</CommandEmpty>
          <CommandGroup heading="Навигация">
            <CommandItem>
              <span>Задачи</span>
            </CommandItem>
            <CommandItem>
              <span>Организации</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Организации">
            <CommandItem>
              <span>Организация 1</span>
            </CommandItem>
            <CommandItem>
              <span>Организация 2</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
