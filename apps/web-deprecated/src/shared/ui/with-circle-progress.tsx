import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

import { cn } from "../lib/cn";
import { MotionLazyDomAnimationFeature, MotionTransitionMap } from "../lib/motion";
import { CircleProgress } from "./circle-progress";

interface WithCircleProgressProps extends React.ComponentProps<"div"> {
  isLoading: boolean;
}

export function WithCircleProgress({
  isLoading,
  children,
  className,
  ...props
}: WithCircleProgressProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <MotionLazyDomAnimationFeature>
        <AnimatePresence>
          {isLoading && (
            <m.span
              initial={{ width: 0, opacity: 0, marginRight: 0 }}
              animate={{ width: "auto", opacity: 1, marginRight: 8 }}
              exit={{ width: 0, opacity: 0, marginRight: 0 }}
              transition={MotionTransitionMap.SPRING}
              className="flex items-center justify-center overflow-hidden"
            >
              <CircleProgress className="shrink-0" />
            </m.span>
          )}
        </AnimatePresence>
      </MotionLazyDomAnimationFeature>
      {children}
    </div>
  );
}
