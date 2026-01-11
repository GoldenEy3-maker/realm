import { cn } from "@/shared/lib/cn";

import { useFormFieldContext } from "./form-field-context";

interface FormDescriptionProps extends React.ComponentProps<"p"> {}

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { formDescriptionId } = useFormFieldContext();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
