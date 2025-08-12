import { useRouter } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRef } from "react";

import { handleFormEvent } from "@/shared/lib/handle-form-event";
import { noop } from "@/shared/lib/noop";
import { useForm } from "@/shared/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";

import { AUTH_CODE_LENGTH } from "../constants/auth-code-length";
import { useVerifyEmailCodeMutation } from "../lib/use-verify-email-code-mutation";
import { authCodeFormSchema } from "../model/auth-code-form-schema";
import { AuthCodeResendButton } from "./auth-code-resend-button";

interface AuthCodeFormProps {
  onSubmitWithoutEmail?: () => void;
  onSuccess?: () => void;
  email: string;
  resendTimeout?: number;
  onUnmount?: (resendTime: number) => void;
  stoppedResendTimeout?: number | null;
}

export function AuthCodeForm({
  onSubmitWithoutEmail = noop,
  onSuccess = noop,
  email,
  resendTimeout: resendTimeoutProp = 60,
  onUnmount = noop,
  stoppedResendTimeout,
}: AuthCodeFormProps) {
  const router = useRouter();
  const inputOTPRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync: verifyEmailCode } = useVerifyEmailCodeMutation({
    onSuccess: () => {
      onSuccess();
      router.navigate({ to: "/" });
    },
  });

  const form = useForm({
    defaultValues: {
      code: "",
    },
    validators: {
      onChange: authCodeFormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      if (!email) {
        onSubmitWithoutEmail();
        return;
      }

      try {
        await verifyEmailCode({
          email,
          code: value.code,
        });
      } catch (error) {
        if (error instanceof Error) {
          formApi.setErrorMap({
            onChange: { fields: { code: { message: error.message } } },
          });

          // Focus to error input on next tick
          setTimeout(() => {
            inputOTPRef.current?.focus();
          }, 0);
        }
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      onSubmit={handleFormEvent(form.handleSubmit)}
    >
      <form.Field
        name="code"
        children={(field) => (
          <form.Item>
            <form.Label>Код подтверждения</form.Label>
            <form.Control>
              <InputOTP
                ref={inputOTPRef}
                maxLength={AUTH_CODE_LENGTH}
                onComplete={form.handleSubmit}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup className="flex-1 gap-2">
                  {Array.from({ length: AUTH_CODE_LENGTH }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="h-12 w-full flex-1 rounded-md border"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </form.Control>
            <form.Message />
          </form.Item>
        )}
      />
      <AuthCodeResendButton
        email={email}
        resendTimeout={resendTimeoutProp}
        onUnmount={onUnmount}
        stoppedResendTimeout={stoppedResendTimeout}
      />
    </form>
  );
}
