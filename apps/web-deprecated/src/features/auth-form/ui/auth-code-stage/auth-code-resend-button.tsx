import { useTransition } from "react";

import { devDelay } from "@/shared/lib/dev-delay";
import { noop } from "@/shared/lib/noop";
import { Button } from "@/shared/ui/button";

import { useSendEmailCodeMutation } from "../../api/use-send-email-code-mutation";
import { useAuthEmailResendTimeout } from "../../lib/use-auth-email-resend-timeout";

interface AuthCodeResendButtonProps {
  resendTimeout: number;
  email: string;
  onUnmount?: (resendTime: number) => void;
  children: (formattedTimeoutText: string | undefined) => React.ReactNode;
  onResendSuccess: () => void;
}

export function AuthCodeResendButton({
  resendTimeout,
  email,
  onUnmount = noop,
  onResendSuccess,
  children,
}: AuthCodeResendButtonProps) {
  const [isResendPending, startResendTransition] = useTransition();
  const { getFormattedTimeoutText, startTimeout, timeout } = useAuthEmailResendTimeout({
    initialTimeout: resendTimeout,
    onUnmount,
  });

  const canResend = timeout === 0;

  const sendEmailCodeMutation = useSendEmailCodeMutation({
    getEmail: () => email,
    onSuccess: () => {
      startTimeout();
      onResendSuccess();
    },
  });

  const handleResend = () => {
    startResendTransition(async () => {
      await devDelay();

      if (canResend) await sendEmailCodeMutation.mutateAsync({ email });
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={!canResend || isResendPending}
      onClick={handleResend}
    >
      {children(!canResend ? `(${getFormattedTimeoutText()})` : undefined)}
    </Button>
  );
}
