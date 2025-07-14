import { MotionConfig as MotionConfigBase } from "motion/react";

export function MotionConfig({ children }: React.PropsWithChildren) {
  return <MotionConfigBase reducedMotion="user">{children}</MotionConfigBase>;
}
