import { Transform } from "class-transformer";

import { parseBoolean } from "../utils/parse-boolean.util";

export function ParseBoolean(): PropertyDecorator {
  // Implicit conversion runs before @Transform, so `value` is already Boolean("false") === true.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return Transform(({ obj, key }) => parseBoolean(obj[key]), { toClassOnly: true });
}
