import { applyDecorators } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponseNoStatusOptions,
  getSchemaPath,
} from "@nestjs/swagger";
import {
  ReferenceObject,
  SchemaObject,
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { ErrorResponseDto, ResponseDto } from "../response/dto/response.dto";
import { ResponseMessage } from "../response/response-message.decorator";

interface OpenApiOptions {
  summary: string;
  success: {
    data: SchemaObject | ReferenceObject;
    message: string;
  };
  exeptions?: ((options?: ApiResponseNoStatusOptions) => MethodDecorator & ClassDecorator)[];
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
    ...(options.exeptions ?? []).map((decorator) =>
      decorator({ schema: { $ref: getSchemaPath(ErrorResponseDto) } }),
    ),
    ResponseMessage(options.success.message),
  );
}
