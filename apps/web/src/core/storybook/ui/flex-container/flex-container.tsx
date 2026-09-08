import { cn } from "@/core/lib/cn";

import styles from "./flex-container.module.scss";

interface FlexContainerProps extends React.ComponentProps<"div"> {}

export function FlexContainer({ className, ...props }: FlexContainerProps) {
  return <div {...props} className={cn(styles.Root, className)} />;
}
