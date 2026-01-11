import type { Encoding } from "crypto";

export interface EncriptionOptions {
  algorithm: string;
  iv: Buffer<ArrayBufferLike>;
  inputEncoding: Encoding;
  outputEncoding: Encoding;
  encoding: BufferEncoding;
}
