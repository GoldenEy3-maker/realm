import { cn } from "../../lib/cn";

interface FormItemProps extends React.ComponentProps<"div"> {}

export function FormItem({ className, ...props }: FormItemProps) {
  return (
    <div
      data-slot="form-item"
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}
