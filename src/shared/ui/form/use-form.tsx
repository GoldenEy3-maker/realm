import {
  FormAsyncValidateOrFn,
  FormOptions,
  FormValidateOrFn,
  ReactFormExtendedApi,
  useForm as useFormCore,
} from "@tanstack/react-form";

import { FormControl } from "./form-control";
import { FormDescription } from "./form-description";
import { FormField } from "./form-field";
import { FormItem } from "./form-item";
import { FormLabel } from "./form-label";
import { FormMessage } from "./form-message";

export function useForm<
  TFormData,
  TOnMount extends undefined | FormValidateOrFn<TFormData>,
  TOnChange extends undefined | FormValidateOrFn<TFormData>,
  TOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnBlur extends undefined | FormValidateOrFn<TFormData>,
  TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnSubmit extends undefined | FormValidateOrFn<TFormData>,
  TOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnServer extends undefined | FormAsyncValidateOrFn<TFormData>,
  TSubmitMeta,
>(
  opts?: FormOptions<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnServer,
    TSubmitMeta
  >,
): ReactFormExtendedApi<
  TFormData,
  TOnMount,
  TOnChange,
  TOnChangeAsync,
  TOnBlur,
  TOnBlurAsync,
  TOnSubmit,
  TOnSubmitAsync,
  TOnServer,
  TSubmitMeta
> & {
  Item: typeof FormItem;
  Label: typeof FormLabel;
  Control: typeof FormControl;
  Description: typeof FormDescription;
  Message: typeof FormMessage;
} {
  const form = useFormCore<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnServer,
    TSubmitMeta
  >(opts);

  // @ts-expect-error - Spreading form trigger error types
  return {
    ...form,
    Field: ({ children, name, ...props }) =>
      // @ts-expect-error - Type incompatibility with @tanstack/react-form Field component with children prop
      FormField({ form, children, name, ...props }),
    Item: FormItem,
    Label: FormLabel,
    Control: FormControl,
    Description: FormDescription,
    Message: FormMessage,
  };
}
