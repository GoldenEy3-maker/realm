import { cn } from "@/core/lib/cn";

import styles from "./product-card.module.scss";

interface ProductCardProps extends React.ComponentProps<"div"> {}

export function ProductCard({ className, children, ...props }: ProductCardProps) {
  return (
    <div {...props} className={cn(styles.Root, className)}>
      {children}
    </div>
  );
}
