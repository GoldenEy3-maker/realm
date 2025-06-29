import { cn } from "@/shared/lib/cn";

import { useFormFieldContext } from "./form-field-context";

interface FormMessageProps extends React.ComponentProps<"p"> {}

export function FormMessage({ className, ...props }: FormMessageProps) {
  const { field, formMessageId } = useFormFieldContext();
  const errors = field.getMeta().errors;

  const body = errors ? String(errors[0]?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}
