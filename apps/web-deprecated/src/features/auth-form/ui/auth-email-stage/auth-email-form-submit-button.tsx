import { Button } from "@/shared/ui/button";
import { WithCircleProgress } from "@/shared/ui/with-circle-progress";

import { useAuthEmailResendTimeout } from "../../lib/use-auth-email-resend-timeout";

interface AuthEmailFormSubmitButtonProps {
  resendTimeout: number;
  onUnmount: (resendTime: number) => void;
  canSubmit: boolean;
  isSubmitting: boolean;
}

export function AuthEmailFormSubmitButton({
  resendTimeout,
  onUnmount,
  canSubmit,
  isSubmitting,
}: AuthEmailFormSubmitButtonProps) {
  const { getFormattedTimeoutText, timeout } = useAuthEmailResendTimeout({
    initialTimeout: resendTimeout,
    onUnmount,
  });

  const timeoutText = timeout > 0 ? `(${getFormattedTimeoutText()})` : undefined;

  return (
    <Button type="submit" disabled={!canSubmit || timeout > 0}>
      <WithCircleProgress isLoading={isSubmitting}>
        {timeoutText ? `Далее ${timeoutText}` : "Далее"}
      </WithCircleProgress>
    </Button>
  );
}
