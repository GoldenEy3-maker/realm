import { type UnkownFunction } from "../types/unkown-function";

export function isFunction(value: unknown): value is UnkownFunction {
  return typeof value === "function";
}
