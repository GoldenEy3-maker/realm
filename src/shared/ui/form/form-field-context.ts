import { AnyFieldApi } from "@tanstack/react-form";
import { createContext, useContext } from "react";

type FormFieldContextState = {
  field: AnyFieldApi;
  id: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
};

export const FormFieldContext = createContext<FormFieldContextState | null>(
  null,
);

export function useFormFieldContext() {
  const fieldContext = useContext(FormFieldContext);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return fieldContext;
}
