import { useState } from "react";
import { useInterval, useUnmount } from "usehooks-ts";

import { ONE_SECOND } from "@/shared/constants/one-second";
import { noop } from "@/shared/lib/noop";

import { AUTH_CODE_RESEND_TIMEOUT_SECONDS } from "../constants/auth-code-resend-timeout-seconds";

interface UseAuthEmailResendTimeoutParams {
  initialTimeout?: number;
  onUnmount?: (timeout: number) => void;
}

export function useAuthEmailResendTimeout({
  initialTimeout = 0,
  onUnmount = noop,
}: UseAuthEmailResendTimeoutParams) {
  const [timeout, setTimeout] = useState(initialTimeout);

  const getFormattedTimeoutText = () => {
    const minutes = Math.floor(timeout / 60);
    const seconds = timeout % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const startTimeout = () => {
    setTimeout(AUTH_CODE_RESEND_TIMEOUT_SECONDS);
  };

  useInterval(() => {
    if (timeout > 0) {
      setTimeout((prev) => prev - 1);
    }
  }, ONE_SECOND);

  useUnmount(() => {
    onUnmount(timeout);
  });

  return {
    getFormattedTimeoutText,
    startTimeout,
    timeout,
  };
}
