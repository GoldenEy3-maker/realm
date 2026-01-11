import { Injectable, ExecutionContext } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerException } from "@nestjs/throttler";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class I18nThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(context: ExecutionContext): Promise<void> {
    const i18n = I18nContext.current(context);
    const message = i18n?.t("common.tooManyRequests") ?? "Too many requests";

    throw new ThrottlerException(message);
  }
}
