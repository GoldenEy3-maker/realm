import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { RedisModule } from "../redis/redis.module";
import { MailerModule } from "../mailer/mailer.module";
import { ProfileModule } from "../profile/profile.module";
import { AuthGuardModule } from "./auth-guard.module";

@Module({
  imports: [AuthGuardModule, UsersModule, ProfileModule, RedisModule, MailerModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
