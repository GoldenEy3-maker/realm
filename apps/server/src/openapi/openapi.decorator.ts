import { applyDecorators } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponseNoStatusOptions,
  getSchemaPath,
  type ReferenceObject,
  type SchemaObject,
} from "@nestjs/swagger";
import { ErrorResponseDto, ResponseDto } from "../response/dto/response.dto";
import { ResponseMessage } from "../response/response-message.decorator";

interface OpenApiOptions {
  summary: string;
  success: {
    data: SchemaObject | ReferenceObject;
    message: string;
  };
  exceptions?: ((options?: ApiResponseNoStatusOptions) => MethodDecorator & ClassDecorator)[];
}

export function OpenApi(options: OpenApiOptions) {
  return applyDecorators(
    ApiOperation({ summary: options.summary }),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          { properties: { data: options.success.data } },
        ],
      },
    }),
    ...(options.exceptions ?? []).map((decorator) =>
      decorator({ schema: { $ref: getSchemaPath(ErrorResponseDto) } }),
    ),
    ResponseMessage(options.success.message),
  );
}
