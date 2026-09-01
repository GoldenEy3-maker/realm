import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { format } from "date-fns";
import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ResponseDto } from "./dto/response.dto";
import { RESPONSE_MESSAGE_METADATA } from "./response-message.decorator";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<ExpressRequest & { _startTime?: number }>();

    const startTime = Date.now();

    request._startTime = startTime;

    if (request.url.includes("nestlens")) {
      return next.handle();
    }

    return next.handle().pipe(map((res: unknown) => this.responseHandler(res, context, startTime)));
  }

  responseHandler(res: unknown, context: ExecutionContext, startTime: number): ResponseDto<T> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const request = ctx.getRequest<ExpressRequest>();
    const statusCode = response.statusCode;
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_METADATA, context.getHandler()) || "success";

    return {
      success: true,
      path: request.url,
      message: message,
      statusCode,
      data: res as T,
      meta: {
        duration: Date.now() - startTime,
        timestamp: format(new Date().toISOString(), "yyyy-MM-dd HH:mm:ss"),
      },
    };
  }
}
