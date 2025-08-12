import { Environment } from "../constants/environment";

export class Logger {
  private static readonly enabled = !Environment.IS_PROD;

  public static log(message: unknown, ...args: unknown[]) {
    if (!this.enabled) return;
    console.log(message, ...args);
  }

  public static error(message: unknown, ...args: unknown[]) {
    if (!this.enabled) return;
    console.error(message, ...args);
  }

  public static warn(message: unknown, ...args: unknown[]) {
    if (!this.enabled) return;
    console.warn(message, ...args);
  }

  public static table(data: unknown, columns?: string[]) {
    if (!this.enabled) return;
    console.table(data, columns);
  }
}
