import { type UnknownFunction } from "../types/unknown-function";
import { isFunction } from "./is-function";

type CallIfFunctionResult<T extends unknown | UnknownFunction> =
  T extends UnknownFunction ? ReturnType<Extract<T, UnknownFunction>> : T;

export function callIfFunction<T extends unknown | UnknownFunction>(
  entry: T,
  ...args: unknown[]
): CallIfFunctionResult<T> {
  if (isFunction(entry)) {
    return entry(...args) as CallIfFunctionResult<T>;
  }

  return entry as Exclude<T, UnknownFunction>;
}
