import { type SVGProps } from "react";

import { cn } from "../lib/cn";

const SIZE = 44;

type CircleProgressVariant = "indeterminate" | "determinate";

interface CircleProgressProps extends SVGProps<SVGSVGElement> {
  value?: number;
  size?: number;
  thickness?: number;
  variant?: CircleProgressVariant;
}

export function CircleProgress({
  className,
  value = 25,
  size = 40,
  thickness = 4.6,
  variant = "indeterminate",
  ...props
}: CircleProgressProps) {
  const circumference = 2 * Math.PI * ((size - thickness) / 2);
  const radius = (size - thickness) / 2;
  const circleDashOffset = (((100 - value) / 100) * circumference).toFixed(3);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      className={cn(
        "-rotate-90",
        {
          "animate-spin": variant === "indeterminate",
        },
        className,
      )}
      {...props}
    >
      <circle
        cx={SIZE}
        cy={SIZE}
        r={radius}
        fill="none"
        stroke="currentColor"
        opacity="0.25"
        strokeWidth={thickness}
      />
      <circle
        cx={SIZE}
        cy={SIZE}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circleDashOffset}
      />
    </svg>
  );
}
