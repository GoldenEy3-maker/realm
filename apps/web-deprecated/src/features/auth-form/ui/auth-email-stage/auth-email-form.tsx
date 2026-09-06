import { handleFormEvent } from "@/shared/lib/handle-form-event";
import { noop } from "@/shared/lib/noop";
import { useForm } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

import { useSendEmailCodeMutation } from "../../api/use-send-email-code-mutation";
import type { AuthEmailFormSchema } from "../../model/auth-email-form-schema";
import { authEmailFormSchema } from "../../model/auth-email-form-schema";
import { AuthEmailFormSubmitButton } from "./auth-email-form-submit-button";

interface AuthEmailFormProps {
  onSuccess?: (variables: AuthEmailFormSchema) => void;
  defaultEmail?: string;
  resendTimeout: number;
  onUnmount?: (resendTime: number) => void;
}

export function AuthEmailForm({
  onSuccess = noop,
  defaultEmail,
  resendTimeout,
  onUnmount = noop,
}: AuthEmailFormProps) {
  const form = useForm({
    defaultValues: {
      email: defaultEmail ?? "",
    },
    validators: {
      onChange: authEmailFormSchema,
    },
    onSubmit: async (data) => {
      await sendEmailCodeMutation.mutateAsync(data.value);
    },
  });

  const sendEmailCodeMutation = useSendEmailCodeMutation({
    getEmail: () => form.getFieldValue("email"),
    onSuccess,
  });

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={handleFormEvent(form.handleSubmit)}>
      <form.Field
        name="email"
        children={(field) => (
          <form.Item>
            <form.Label>Email</form.Label>
            <form.Control>
              <Input
                type="email"
                placeholder="Введите email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </form.Control>
            <form.Message />
          </form.Item>
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <AuthEmailFormSubmitButton
            resendTimeout={resendTimeout}
            onUnmount={onUnmount}
            canSubmit={!!canSubmit}
            isSubmitting={!!isSubmitting}
          />
        )}
      />
    </form>
  );
}
