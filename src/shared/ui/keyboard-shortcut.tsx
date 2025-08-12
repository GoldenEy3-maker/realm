import { cn } from "../lib/cn";

interface KeyboardShortcutProps extends React.ComponentProps<"kbd"> {}

export function KeyboardShortcut({
  children,
  className,
  ...props
}: KeyboardShortcutProps) {
  return (
    <kbd
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-0.5 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
