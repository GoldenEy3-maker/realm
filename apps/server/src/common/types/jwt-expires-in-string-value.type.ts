import { JwtSignOptions } from "@nestjs/jwt";

export type JwtExpiresInStringValue = Exclude<JwtSignOptions["expiresIn"], number>;
