import { devDelay } from "@/shared/lib/dev-delay";
import { handleFormEvent } from "@/shared/lib/handle-form-event";
import { noop } from "@/shared/lib/noop";
import { useForm } from "@/shared/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";

import { authCodeFormSchema } from "../model/auth-code-form-schema";

interface AuthCodeFormProps {
  onSuccess?: () => void;
}

export function AuthCodeForm({ onSuccess = noop }: AuthCodeFormProps) {
  const form = useForm({
    defaultValues: {
      verificationCode: "",
    },
    validators: {
      onChange: authCodeFormSchema,
    },
    onSubmit: async (_data) => {
      await devDelay();
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
        name="verificationCode"
        children={(field) => (
          <form.Item>
            <form.Label>Код подтверждения</form.Label>
            <form.Control>
              <InputOTP
                maxLength={6}
                onComplete={field.handleChange}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={0}
                    className="size-12 rounded-md border"
                  />
                  <InputOTPSlot
                    index={1}
                    className="size-12 rounded-md border"
                  />
                  <InputOTPSlot
                    index={2}
                    className="size-12 rounded-md border"
                  />
                  <InputOTPSlot
                    index={3}
                    className="size-12 rounded-md border"
                  />
                  <InputOTPSlot
                    index={4}
                    className="size-12 rounded-md border"
                  />
                  <InputOTPSlot
                    index={5}
                    className="size-12 rounded-md border"
                  />
                </InputOTPGroup>
              </InputOTP>
            </form.Control>
            <form.Message />
          </form.Item>
        )}
      />
      {/* <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            <WithCircleProgress loading={isSubmitting}>
              Далее
            </WithCircleProgress>
          </Button>
        )}
      /> */}
    </form>
  );
}
