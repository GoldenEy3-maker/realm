import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Response as ExpressResponse, Request as ExpressRequest } from "express";
import { format } from "date-fns";
import { ErrorResponseDto } from "./dto/response.dto";
import { I18nContext } from "nestjs-i18n";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const i18n = I18nContext.current(host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const request = ctx.getRequest<ExpressRequest & { _startTime?: number }>();

    const internalServerErrorMessage =
      i18n?.t("common.internalServerError") ?? "Internal server error";

    const startTime = request._startTime ?? Date.now();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = exception instanceof HttpException ? exception.getResponse() : {};

    const exeptionMessage =
      exception instanceof Error ? exception.message : internalServerErrorMessage;

    const errorResponse: ErrorResponseDto["error"] =
      typeof responseBody === "string"
        ? {
            message: exeptionMessage,
            error: responseBody,
            errors: {},
          }
        : {
            // @ts-expect-error - responseBody is of type unknown
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            error: responseBody.error ?? "",
            // @ts-expect-error - responseBody is of type unknown
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            message: responseBody.message ?? "",
            // @ts-expect-error - responseBody is of type unknown
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            errors: responseBody.errors ?? {},
          };

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      message: exeptionMessage,
      error: errorResponse,
      meta: {
        timestamp: format(new Date().toISOString(), "yyyy-MM-dd HH:mm:ss"),
        duration: Date.now() - startTime,
      },
    } satisfies ErrorResponseDto);
  }
}
