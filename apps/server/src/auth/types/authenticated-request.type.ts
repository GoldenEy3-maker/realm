import type { Request } from "express";

import type { AccessTokenPayload } from "../auth.service";

export type AuthenticatedRequest = Request & { user: AccessTokenPayload };
