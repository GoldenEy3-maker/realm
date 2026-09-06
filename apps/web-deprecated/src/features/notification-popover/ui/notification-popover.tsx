import { BellIcon } from "@/shared/icons/bell-icon";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export const NotificationPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon-rounded"
          variant="secondary"
          className="relative ml-4"
          aria-label="Уведомления"
        >
          <BellIcon className="size-5" />
          <Badge
            className="absolute -top-1 -right-1 h-6 min-w-6 px-0.5 text-sm"
            variant="destructive"
          >
            2
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-100 p-0">
        <div className="flex flex-col gap-4 p-4">
          <Heading as="h5">Уведомления</Heading>
        </div>
      </PopoverContent>
    </Popover>
  );
};
