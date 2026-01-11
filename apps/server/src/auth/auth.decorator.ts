import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { ApiBearerAuth, ApiHeaders } from "@nestjs/swagger";

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
