import { cn } from "@/core/lib/cn";

import styles from "./button.module.scss";

interface ButtonProps extends React.ComponentProps<"button"> {}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(styles.Root, className)}>
      {children}
    </button>
  );
}
