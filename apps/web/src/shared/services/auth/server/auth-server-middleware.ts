import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

import { authServerFn } from "./auth-server-fn";

export const authMiddleware = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const session = await authServerFn();

  if (!session) throw redirect({ to: "/auth" });

  return next({
    context: {
      session,
    },
  });
});
