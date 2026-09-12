import type { OTPInputProps as OTPInputPrimitiveProps } from "input-otp";
import {
  OTPInput as OTPInputPrimitive,
  OTPInputContext as OTPInputPrimitiveContext,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";
import { use, useMemo } from "react";
import type { ValidationResult } from "react-aria-components/FieldError";
import { FieldErrorContext as FieldErrorPrimitiveContext } from "react-aria-components/FieldError";

import { cn } from "@/core/lib/cn";

import styles from "./input-otp.module.scss";
import { InputOTPProvider, useInputOTPContext } from "./input-otp-context";
import type { InputOTPVariant } from "./input-otp-variant";

interface InputOTPProps extends Omit<
  OTPInputPrimitiveProps,
  "disabled" | "containerClassName" | "render"
> {
  isDisabled?: boolean;
  isInvalid?: boolean;
  validationErrors?: string[];
  validationDetails?: ValidityState;
  inputClassName?: string;
  children: React.ReactNode;
  variant?: InputOTPVariant;
}

function InputOTP({
  isDisabled = false,
  isInvalid = false,
  className,
  inputClassName,
  validationDetails,
  validationErrors = [],
  variant = "primary",
  ...props
}: InputOTPProps) {
  const validation = useMemo(() => {
    return {
      isInvalid,
      validationDetails,
      validationErrors,
    } as ValidationResult;
  }, [isInvalid, validationDetails, validationErrors]);

  return (
    <InputOTPProvider isDisabled={isDisabled} isInvalid={isInvalid} variant={variant}>
      <FieldErrorPrimitiveContext value={validation}>
        <OTPInputPrimitive
          {...props}
          className={cn(inputClassName)}
          containerClassName={cn(styles.Root, className)}
          data-disabled={isDisabled}
          data-invalid={isInvalid}
          data-slot="input-otp"
          data-variant={variant}
          disabled={isDisabled}
        />
      </FieldErrorPrimitiveContext>
    </InputOTPProvider>
  );
}

interface InputOTPGroupProps extends React.ComponentProps<"div"> {}

function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return <div {...props} className={cn(styles.Group, className)} data-slot="input-otp-group" />;
}

interface InputOTPSlotProps extends Omit<React.ComponentProps<"div">, "children"> {
  index: number;
}

function InputOTPSlot({ index, className, ...props }: InputOTPSlotProps) {
  const { isDisabled, isInvalid, variant } = useInputOTPContext("InputOTPSlot");

  const otpInputPrimitiveContext = use(OTPInputPrimitiveContext);

  const { char, hasFakeCaret, isActive, placeholderChar } =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    otpInputPrimitiveContext?.slots[index] ?? {};

  return (
    <div
      {...props}
      className={cn(styles.Slot, className)}
      data-active={isActive}
      data-disabled={isDisabled}
      data-filled={!!char}
      data-invalid={isInvalid}
      data-slot="input-otp-slot"
      data-variant={variant}
    >
      {placeholderChar && (
        <div className={styles.Placeholder} data-slot="input-otp-placeholder-char">
          {placeholderChar}
        </div>
      )}
      {char && (
        <div className={styles.Char} data-slot="input-otp-char">
          {char}
        </div>
      )}
      {hasFakeCaret && isActive && <div className={styles.Caret} data-slot="input-otp-caret" />}
    </div>
  );
}

interface InputOTPSeparatorProps extends Omit<React.ComponentProps<"div">, "children"> {}

function InputOTPSeparator({ className, ...props }: InputOTPSeparatorProps) {
  return (
    <div {...props} className={cn(styles.Separator, className)} data-slot="input-otp-separator" />
  );
}

InputOTP.Group = InputOTPGroup;
InputOTP.Slot = InputOTPSlot;
InputOTP.Separator = InputOTPSeparator;

export { InputOTP, REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS };
