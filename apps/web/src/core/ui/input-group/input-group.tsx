import type { GroupProps as GroupPrimitiveProps } from "react-aria-components/Group";
import { Group as GroupPrimitive } from "react-aria-components/Group";
import type { InputProps as InputPrimitiveProps } from "react-aria-components/Input";
import { Input as InputPrimitive } from "react-aria-components/Input";

import { cn } from "@/core/lib/cn";

import styles from "./input-group.module.scss";

interface InputGroupProps extends GroupPrimitiveProps {
  variant?: "primary" | "secondary";
}

function InputGroup({ className, variant = "primary", onClick, ...props }: InputGroupProps) {
  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget;
    const input = currentTarget.querySelector("input");

    if (input && target !== input && !input.contains(target)) {
      input.focus();
    }

    onClick?.(event);
  }

  return (
    <GroupPrimitive
      {...props}
      className={cn(styles.Root, className)}
      data-slot="input-group"
      data-variant={variant}
      onClick={handleClick}
    />
  );
}

interface InputGroupPrefixProps extends React.ComponentProps<"div"> {
  isButton?: boolean;
}

function InputGroupPrefix({ className, isButton = false, ...props }: InputGroupPrefixProps) {
  return (
    <div
      {...props}
      className={cn(styles.Prefix, className)}
      data-is-button={isButton}
      data-slot="input-group-prefix"
    />
  );
}

interface InputGroupSuffixProps extends React.ComponentProps<"div"> {
  isButton?: boolean;
}

function InputGroupSuffix({ className, isButton = false, ...props }: InputGroupSuffixProps) {
  return (
    <div
      {...props}
      className={cn(styles.Suffix, className)}
      data-is-button={isButton}
      data-slot="input-group-suffix"
    />
  );
}

interface InputGroupInputProps extends InputPrimitiveProps {}

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <InputPrimitive
      {...props}
      className={cn(styles.Input, className)}
      data-slot="input-group-input"
    />
  );
}

InputGroup.Prefix = InputGroupPrefix;
InputGroup.Suffix = InputGroupSuffix;
InputGroup.Input = InputGroupInput;

export { InputGroup };
