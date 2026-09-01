import { Module } from "@nestjs/common";

import { MailerModule } from "@/infrastructure/mailer/mailer.module";
import { RedisModule } from "@/infrastructure/redis/redis.module";
import { ProfileModule } from "@/profile/profile.module";
import { UsersModule } from "@/users/users.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuardModule } from "./auth-guard.module";
import { VerificationCodeMailer } from "./mail/verification-code.mailer";

@Module({
  imports: [AuthGuardModule, UsersModule, ProfileModule, RedisModule, MailerModule],
  providers: [AuthService, VerificationCodeMailer],
  controllers: [AuthController],
})
export class AuthModule {}
