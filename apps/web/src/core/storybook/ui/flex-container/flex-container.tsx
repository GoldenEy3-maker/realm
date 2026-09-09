import { cn } from "@/core/lib/cn";

import styles from "./flex-container.module.scss";

type FlexContainerDirection = "row" | "column";

interface FlexContainerProps extends React.ComponentProps<"div"> {
  direction?: FlexContainerDirection;
}

export function FlexContainer({ className, direction = "row", ...props }: FlexContainerProps) {
  return <div {...props} className={cn(styles.Root, className)} data-direction={direction} />;
}
