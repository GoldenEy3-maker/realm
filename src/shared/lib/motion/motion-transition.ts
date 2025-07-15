import { type Transition } from "motion/react";

export const MotionTransitionMap = {
  SPRING: {
    type: "spring",
    stiffness: 100,
    damping: 10,
  } satisfies Transition,
} as const;
