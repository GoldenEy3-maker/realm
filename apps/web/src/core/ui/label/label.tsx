import type { LabelProps as LabelPrimitiveProps } from "react-aria-components/Label";
import { Label as LabelPrimitive } from "react-aria-components/Label";

import { cn } from "@/core/lib/cn";

import styles from "./label.module.scss";

interface LabelProps extends LabelPrimitiveProps {}

export function Label({ className, ...props }: LabelProps) {
  return <LabelPrimitive {...props} className={cn(styles.Root, className)} data-slot="label" />;
}
