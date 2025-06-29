import { Slot } from "@radix-ui/react-slot";

import { useFormFieldContext } from "./form-field-context";

interface FormControlProps extends React.ComponentProps<typeof Slot> {}

export function FormControl({ ...props }: FormControlProps) {
  const { field, formItemId, formDescriptionId, formMessageId } =
    useFormFieldContext();
  const errors = field.getMeta().errors;

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !errors?.length
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!errors?.length}
      {...props}
    />
  );
}
