import { type UnkFunction } from "../types/unk-function";

export function isFunction(value: unknown): value is UnkFunction {
  return typeof value === "function";
}
