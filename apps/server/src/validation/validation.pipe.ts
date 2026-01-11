import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from "@nestjs/common";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ValidationErrors } from "./validation-errors.interface";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const i18n = I18nContext.current();

    const object = plainToInstance<unknown, unknown>(metatype, value);
    const errors = (await i18n?.validate(object as object)) ?? (await validate(object as object));

    if (errors.length > 0) {
      const errorsObject = errors.reduce((acc, error) => {
        acc[error.property] = Object.values(error.constraints ?? {});
        return acc;
      }, {} as ValidationErrors);

      const errorConstraits = errors.map((error) => Object.values(error.constraints ?? {})).flat();

      const MAX_VISIBLE_ERRORS = 2;

      const errorMessage =
        errors.length > MAX_VISIBLE_ERRORS
          ? i18n?.t("validation.validationErrorsMessageExtended", {
              args: {
                errors: errorConstraits.join(", "),
                count: errorConstraits.length - MAX_VISIBLE_ERRORS,
              },
            })
          : i18n?.t("validation.validationErrorsMessage", {
              args: {
                errors: errorConstraits.join(", "),
              },
            });

      throw new UnprocessableEntityException({
        message: errorMessage,
        errors: errorsObject,
      });
    }

    return value;
  }

  private toValidate(metatype: new (...args: unknown[]) => unknown): boolean {
    const types: (new (...args: unknown[]) => unknown)[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
