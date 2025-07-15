import { type BinaryToTextEncoding } from "crypto";

export interface HashOptions {
  algorithm: string;
  encoding: BinaryToTextEncoding;
}
