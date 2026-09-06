import classNames from "classnames";

export function cn(...classes: (string | undefined)[]) {
  return classNames(...classes);
}
