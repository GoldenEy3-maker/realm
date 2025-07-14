import { useMutation } from "@tanstack/react-query";

import { devDelay } from "@/shared/lib/dev-delay";
import { handleFormEvent } from "@/shared/lib/handle-form-event";
import { Button } from "@/shared/ui/button";
import { useForm } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { WithCircleProgress } from "@/shared/ui/with-circle-progress";

import { AuthFormSchema, authFormSchema } from "../model/auth-form-schema";
import { authSendMailCodeServerFn } from "../server-fns/auth-send-mail-code";

export function AuthForm() {
  const sendMailCodeMutation = useMutation({
    mutationFn: (data: AuthFormSchema) => authSendMailCodeServerFn({ data }),
    meta: {
      errorMessage: "Не удалось отправить код. Повторите попытку позже.",
      successMessage: () => `Код отправлен на ${form.getFieldValue("email")}`,
    },
    onSuccess: () => {
      form.reset();
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: authFormSchema,
    },
    onSubmit: async (data) => {
      await devDelay();
      sendMailCodeMutation.mutate(data.value);
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
