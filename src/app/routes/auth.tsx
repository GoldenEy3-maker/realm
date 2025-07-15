import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { authFormStageMapSchema, AuthPage } from "@/pages/auth";
import { schemaValidation } from "@/shared/lib/schema-validation";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  validateSearch: zodValidator(
    schemaValidation.object({
      stage: authFormStageMapSchema.optional(),
    }),
  ),
});

function RouteComponent() {
  return <AuthPage />;
}
