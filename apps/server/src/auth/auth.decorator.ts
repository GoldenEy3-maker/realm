import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiHeaders } from "@nestjs/swagger";

import { AuthGuard } from "./auth.guard";

export function Auth() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiHeaders([
      {
        name: "Authorization",
        description: "Enter the token with the `Bearer` prefix, e.g. `Bearer <token>`",
      },
    ]),
  );
}
