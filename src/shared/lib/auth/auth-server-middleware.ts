import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

import { authServerFn } from "./auth-server-fn";

export const authMiddelware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const session = await authServerFn({
      data: { shouldUpdateSession: false },
    });

    if (!session) throw redirect({ to: "/auth" });

    return next({
      context: {
        session,
      },
    });
  },
);
