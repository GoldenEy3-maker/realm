import type { TextProps as TextPrimitiveProps } from "react-aria-components/Text";
import { Text as TextPrimitive } from "react-aria-components/Text";

import { cn } from "@/core/lib/cn";

import styles from "./description.module.scss";

interface DescriptionProps extends Omit<TextPrimitiveProps, "slot"> {}

export function Description({ className, ...props }: DescriptionProps) {
  return <TextPrimitive {...props} className={cn(styles.Root, className)} slot="description" />;
}
