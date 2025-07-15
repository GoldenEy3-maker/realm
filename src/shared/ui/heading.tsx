import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../lib/cn";
import { type HeadingTag } from "../types/heading-tag";
import { type PropsWithSlotReplacer } from "../types/props-with-slot-replacer";

const HeadingVariants = cva("", {
  variants: {
    as: {
      h1: "text-4xl leading-tight font-bold",
      h2: "text-3xl leading-tight font-bold",
      h3: "text-[clamp(var(--text-xl),var(--text-2xl))] leading-tight font-semibold",
      h4: "text-xl leading-tight font-semibold",
      h5: "text-lg leading-tight font-semibold",
      h6: "text-base leading-tight font-semibold",
    },
  },
  defaultVariants: {
    as: "h1",
  },
});

interface HeadingProps
  extends React.ComponentProps<HeadingTag>,
    PropsWithSlotReplacer {
  as?: HeadingTag;
}

export function Heading({
  children,
  className,
  as: As = "h1",
  asChild = false,
  ...props
}: HeadingProps) {
  const Component = asChild ? Slot : As;

  return (
    <Component
      className={cn(HeadingVariants({ as: As }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
