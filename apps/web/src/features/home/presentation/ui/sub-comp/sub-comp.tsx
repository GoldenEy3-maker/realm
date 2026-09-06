import { cn } from "@/core/lib/cn";

import styles from "./sub-comp.module.scss";

interface SubCompProps extends React.ComponentProps<"div"> {}

export function SubComp({ className, children, ...props }: SubCompProps) {
  return (
    <div {...props} className={cn(styles.Root, className)}>
      {children}
    </div>
  );
}
