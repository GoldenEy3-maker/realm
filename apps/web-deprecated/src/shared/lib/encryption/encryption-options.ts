import type { Encoding } from "crypto";

export interface EncryptionOptions {
  algorithm: string;
  iv: Buffer<ArrayBufferLike>;
  inputEncoding: Encoding;
  outputEncoding: Encoding;
  encoding: BufferEncoding;
}
