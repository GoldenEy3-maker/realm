import type { TextProps as TextPrimitiveProps } from "react-aria-components/Text";
import { Text as TextPrimitive } from "react-aria-components/Text";

import { cn } from "@/core/lib/cn";

import styles from "./error-message.module.scss";

interface ErrorMessageProps extends Omit<TextPrimitiveProps, "slot"> {}

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return <TextPrimitive {...props} className={cn(styles.Root, className)} slot="errorMessage" />;
}
