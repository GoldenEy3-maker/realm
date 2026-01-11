import { type UnkownFunction } from "../types/unkown-function";
import { isFunction } from "./is-function";

type CallIfFunctionResult<T extends unknown | UnkownFunction> = T extends UnkownFunction
  ? ReturnType<Extract<T, UnkownFunction>>
  : T;

export function callIfFunction<T extends unknown | UnkownFunction>(
  entry: T,
  ...args: unknown[]
): CallIfFunctionResult<T> {
  if (isFunction(entry)) {
    return entry(...args) as CallIfFunctionResult<T>;
  }

  return entry as Exclude<T, UnkownFunction>;
}
