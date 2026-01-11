import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { authConfig, JwtConfig } from "./config/auth.config";
import { createSecretKey } from "crypto";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.getOrThrow<JwtConfig>("auth.jwt");

        return {
          secret: createSecretKey(Buffer.from(jwtConfig.secret)),
        };
      },
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard, JwtModule],
})
export class AuthGuardModule {}
