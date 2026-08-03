import { type UnknownFunction } from "../types/unknown-function";

export function isFunction(value: unknown): value is UnknownFunction {
  return typeof value === "function";
}
