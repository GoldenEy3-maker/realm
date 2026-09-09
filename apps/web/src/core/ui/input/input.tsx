import type { InputProps as InputPrimitiveProps } from "react-aria-components/input";
import { Input as InputPrimitive } from "react-aria-components/input";

import { cn } from "@/core/lib/cn";

import styles from "./input.module.scss";

type InputVariant = "primary" | "secondary";

interface InputProps extends InputPrimitiveProps {
  variant?: InputVariant;
}

export function Input({ className, variant = "primary", ...props }: InputProps) {
  return (
    <InputPrimitive {...props} className={cn(styles.Root, className)} data-variant={variant} />
  );
}
