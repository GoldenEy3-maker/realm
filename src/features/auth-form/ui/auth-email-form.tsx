import { handleFormEvent } from "@/shared/lib/handle-form-event";
import { noop } from "@/shared/lib/noop";
import { Button } from "@/shared/ui/button";
import { useForm } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { WithCircleProgress } from "@/shared/ui/with-circle-progress";

import { useSendEmailCodeMutation } from "../lib/use-send-email-code-mutation";
import type { AuthEmailFormSchema } from "../model/auth-email-form-schema";
import { authEmailFormSchema } from "../model/auth-email-form-schema";

interface AuthEmailFormProps {
  onSuccess?: (variables: AuthEmailFormSchema) => void;
  defaultEmail?: string;
}

export function AuthEmailForm({
  onSuccess = noop,
  defaultEmail,
}: AuthEmailFormProps) {
  const form = useForm({
    defaultValues: {
      email: defaultEmail ?? "",
    },
    validators: {
      onChange: authEmailFormSchema,
    },
    onSubmit: async (data) => {
      await sendEmailCode(data.value);
    },
  });

  const { mutateAsync: sendEmailCode } = useSendEmailCodeMutation({
    getEmail: () => form.getFieldValue("email"),
    onSuccess: (variables) => {
      onSuccess(variables);
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      onSubmit={handleFormEvent(form.handleSubmit)}
    >
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
          <Button type="submit" disabled={!canSubmit}>
            <WithCircleProgress loading={isSubmitting}>
              Далее
            </WithCircleProgress>
          </Button>
        )}
      />
    </form>
  );
}
