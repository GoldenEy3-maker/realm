import { type HashOptions } from "./hash-options";

export function getOptions(options: Partial<HashOptions> = {}): HashOptions {
  return {
    algorithm: options.algorithm ?? "sha256",
    encoding: options.encoding ?? "hex",
  };
}
