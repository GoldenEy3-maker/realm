import { createFileRoute } from "@tanstack/react-router";

import { getAuthEmailVerificationIntentTokenServerFn } from "@/features/auth-form/server-fns";
import { AuthPage } from "@/pages/auth/ui";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  loader: async () => {
    const authEmailVerificationIntentToken = await getAuthEmailVerificationIntentTokenServerFn();

    return { authEmailVerificationIntentToken };
  },
});

function RouteComponent() {
  const { authEmailVerificationIntentToken } = Route.useLoaderData();

  return <AuthPage emailVeirficationIntentData={authEmailVerificationIntentToken} />;
}
