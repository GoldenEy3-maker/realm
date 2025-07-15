import type * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/shared/lib/cn";

import { Label } from "../label";
import { useFormFieldContext } from "./form-field-context";

interface FormLabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root> {}

export function FormLabel({ className, ...props }: FormLabelProps) {
  const { field, formItemId } = useFormFieldContext();
  const errors = field.getMeta().errors;

  return (
    <Label
      data-slot="form-label"
      data-error={!!errors?.length}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}
