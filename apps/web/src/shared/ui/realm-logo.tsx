import { RealmLogoIcon } from "../icons/realm-logo-icon";
import { cn } from "../lib/cn";

interface RealmLogoProps extends React.ComponentProps<"span"> {}

export function RealmLogo({ className, ...props }: RealmLogoProps) {
  return (
    <span
      className={cn(
        "bg-primary text-background inline-flex size-8 items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      <RealmLogoIcon data-slot="icon" className="size-6" />
    </span>
  );
}
