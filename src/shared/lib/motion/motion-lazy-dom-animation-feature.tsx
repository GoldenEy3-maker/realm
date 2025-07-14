import { LazyMotion } from "motion/react";

const loadDomAnimationFeature = () =>
  import("./motion-dom-animation-features").then((m) => m.domAnimation);

export function MotionLazyDomAnimationFeature({
  children,
}: React.PropsWithChildren) {
  return (
    <LazyMotion features={loadDomAnimationFeature} strict>
      {children}
    </LazyMotion>
  );
}
