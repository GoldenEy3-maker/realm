import { RealmLogoIcon } from "../icons/realm-logo-icon";
import { cn } from "../lib/cn";

interface LogoProps extends React.ComponentProps<"span"> {}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <span
      className={cn(
        "bg-primary text-background inline-flex size-7 items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      <RealmLogoIcon data-slot="icon" className="size-5" />
    </span>
  );
}
