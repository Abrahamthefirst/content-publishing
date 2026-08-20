import { type Request } from "express";
import type { AuthJWT } from "./jwt.types";

export type AuthRequest = Request & { user: AuthJWT };
