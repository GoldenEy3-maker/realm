import { createFileRoute } from "@tanstack/react-router";

import { getAuthCodeTokenServerFn } from "@/features/auth-form";
import { AuthPage } from "@/pages/auth";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  loader: async () => {
    const authCodeToken = await getAuthCodeTokenServerFn();

    return { authCodeToken };
  },
});

function RouteComponent() {
  const { authCodeToken } = Route.useLoaderData();

  return <AuthPage sendedEmail={authCodeToken?.email ?? null} />;
}
