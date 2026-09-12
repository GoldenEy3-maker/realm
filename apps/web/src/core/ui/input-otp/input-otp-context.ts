import { createContext } from "@/core/lib/createContext";

interface InputOTPContextValue {
  isDisabled: boolean;
  isInvalid: boolean;
  variant: "primary" | "secondary";
}

export const [InputOTPProvider, useInputOTPContext] = createContext<InputOTPContextValue>(
  "InputOTP",
  {
    isDisabled: false,
    isInvalid: false,
    variant: "primary",
  },
);
