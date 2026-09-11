import type { TextFieldProps as TextFieldPrimitiveProps } from "react-aria-components/TextField";
import { TextField as TextFieldPrimitive } from "react-aria-components/TextField";

import { cn } from "@/core/lib/cn";

import styles from "./textfield.module.scss";

interface TextFieldProps extends TextFieldPrimitiveProps {}

export function TextField({ className, ...props }: TextFieldProps) {
  return <TextFieldPrimitive {...props} className={cn(styles.Root, className)} />;
}
