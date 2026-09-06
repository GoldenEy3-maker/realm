/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export class Logger {
  private static _isEnabled = import.meta.env.DEV;

  public static log(...data: any[]) {
    if (!Logger._isEnabled) return;
    console.log(data);
  }

  public static info(...data: any[]) {
    if (!Logger._isEnabled) return;
    console.info(data);
  }

  public static warn(...data: any[]) {
    if (!Logger._isEnabled) return;
    console.warn(data);
  }

  public static error(...data: any[]) {
    if (!Logger._isEnabled) return;
    console.error(data);
  }
}
