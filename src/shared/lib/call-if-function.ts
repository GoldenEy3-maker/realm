import { UnkFunction } from "../types/unk-function";
import { isFunction } from "./is-function";

type CallIfFunctionResult<T extends unknown | UnkFunction> =
  T extends UnkFunction ? ReturnType<Extract<T, UnkFunction>> : T;

export function callIfFunction<T extends unknown | UnkFunction>(
  entry: T,
  ...args: unknown[]
): CallIfFunctionResult<T> {
  if (isFunction(entry)) {
    return entry(...args) as CallIfFunctionResult<T>;
  }

  return entry as Exclude<T, UnkFunction>;
}
