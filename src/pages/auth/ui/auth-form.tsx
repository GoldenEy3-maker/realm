import { handleFormEvent } from "@/shared/lib/handle-form-event";
import { Button } from "@/shared/ui/button";
import { useForm } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

import { authFormSchema } from "../model/auth-form-schema";

export function AuthForm() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: authFormSchema,
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
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
            {isSubmitting ? "Отправка..." : "Далее"}
          </Button>
        )}
      />
    </form>
  );
}
