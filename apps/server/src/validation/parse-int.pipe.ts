import { PipeTransform, Injectable, UnprocessableEntityException } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new UnprocessableEntityException("Validation failed (numeric value expected)");
    }

    return val;
  }
}
