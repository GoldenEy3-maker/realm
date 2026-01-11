import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { AuthGuardModule } from "../auth/auth-guard.module";

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UsersModule, AuthGuardModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
