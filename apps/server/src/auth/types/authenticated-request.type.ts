import { AccessTokenPayload } from "../auth.service";
import { Request } from "express";

export type AuthenticatedRequest = Request & { user: AccessTokenPayload };
