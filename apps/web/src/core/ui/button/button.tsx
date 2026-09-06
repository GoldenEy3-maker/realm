import type { ButtonProps as ButtonPrimitiveProps } from "react-aria-components/Button";
import { Button as ButtonPromitive } from "react-aria-components/Button";

import { cn } from "@/core/lib/cn";

import styles from "./button.module.scss";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "danger-soft";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonPrimitiveProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onlyIcon?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  onlyIcon = false,
  ...props
}: ButtonProps) {
  return (
    <ButtonPromitive
      {...props}
      data-variant={variant}
      data-size={size}
      data-only-icon={onlyIcon}
      className={cn(styles.Root, className)}
    />
  );
}
