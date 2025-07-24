import { useMemo, useState, useTransition } from "react";
import { useInterval, useUnmount } from "usehooks-ts";

import { devDelay } from "@/shared/lib/dev-delay";
import { noop } from "@/shared/lib/noop";
import { Button } from "@/shared/ui/button";

import { useSendEmailCodeMutation } from "../lib/use-send-email-code-mutation";

interface AuthCodeResendButtonProps {
  resendTimeout?: number;
  email: string;
  onUnmount?: (resendTime: number) => void;
  stoppedResendTimeout?: number | null;
}

export function AuthCodeResendButton({
  resendTimeout: resendTimeoutProp = 60,
  email,
  onUnmount = noop,
  stoppedResendTimeout,
}: AuthCodeResendButtonProps) {
  const [isResendPending, startResendTransition] = useTransition();
  const [resendTimeout, setResendTimeout] = useState(
    stoppedResendTimeout ?? resendTimeoutProp,
  );

  const resendTime = useMemo(() => {
    const minutes = Math.floor(resendTimeout / 60);
    const seconds = resendTimeout % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [resendTimeout]);

  const canResend = resendTimeout === 0;

  const sendEmailCodeMutation = useSendEmailCodeMutation({
    getEmail: () => email,
    onSuccess: () => setResendTimeout(resendTimeoutProp),
  });

  const handleResend = () => {
    startResendTransition(async () => {
      await devDelay();

      if (canResend) await sendEmailCodeMutation.mutateAsync({ email });
    });
  };

  const resendText = useMemo(() => {
    if (!canResend) {
      return `Отправить код повторно (${resendTime})`;
    }

    return "Отправить код повторно";
  }, [canResend, resendTime]);

  useInterval(() => {
    if (resendTimeout > 0) {
      setResendTimeout((prev) => prev - 1);
    }
  }, 1000);

  useUnmount(() => {
    onUnmount(resendTimeout);
  });

  return (
    <Button
      type="button"
      variant="outline"
      disabled={!canResend || isResendPending}
      onClick={handleResend}
    >
      {resendText}
    </Button>
  );
}
