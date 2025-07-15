import { devDelay } from "@/shared/lib/dev-delay";
import { handleFormEvent } from "@/shared/lib/handle-form-event";
import { noop } from "@/shared/lib/noop";
import { Button } from "@/shared/ui/button";
import { useForm } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { WithCircleProgress } from "@/shared/ui/with-circle-progress";

import { useSendEmailCodeMutation } from "../lib/use-send-email-code-mutation";
import { authEmailFormSchema } from "../model/auth-email-form-schema";

interface AuthEmailFormProps {
  onSuccess?: () => void;
}

export function AuthEmailForm({ onSuccess = noop }: AuthEmailFormProps) {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: authEmailFormSchema,
    },
    onSubmit: async (data) => {
      await devDelay();
      sendEmailCodeMutation.mutate(data.value);
    },
  });

  const sendEmailCodeMutation = useSendEmailCodeMutation({
    getEmail: () => form.getFieldValue("email"),
    onSuccess: () => {
      form.reset();
      onSuccess();
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
