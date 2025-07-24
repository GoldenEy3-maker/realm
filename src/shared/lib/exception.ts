import type { ValueOf } from "../types/value-of";

export const ExceptionCodeMap = {
  NOT_FOUND: "NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  CODE_ERROR: "CODE_ERROR",
} as const;

export type ExceptionCodeMap = ValueOf<typeof ExceptionCodeMap>;

export class Exception extends Error {
  code: ExceptionCodeMap;

  constructor(message: string, code: ExceptionCodeMap) {
    super(message);
    this.code = code;
  }

  static notFound(message: string) {
    return new Exception(message, ExceptionCodeMap.NOT_FOUND);
  }

  static badRequest(message: string) {
    return new Exception(message, ExceptionCodeMap.BAD_REQUEST);
  }

  static unauthorized(message: string) {
    return new Exception(message, ExceptionCodeMap.UNAUTHORIZED);
  }

  static forbidden(message: string) {
    return new Exception(message, ExceptionCodeMap.FORBIDDEN);
  }

  static internalServerError(message: string) {
    return new Exception(message, ExceptionCodeMap.INTERNAL_SERVER_ERROR);
  }

  static codeError(message: string) {
    return new Exception(message, ExceptionCodeMap.CODE_ERROR);
  }
}
