import path, { join } from "node:path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { seconds, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request as ExpressRequest } from "express";
import { AcceptLanguageResolver, I18nModule } from "nestjs-i18n";
import { NestLensModule } from "nestlens";

import { AuthModule } from "@/auth/auth.module";
import { I18nThrottlerGuard } from "@/common/throttler/i18n-throttler.guard";
import { dataSourceOptions } from "@/infrastructure/db/datasource";
import { MailerModule } from "@/infrastructure/mailer/mailer.module";
import { RedisModule } from "@/infrastructure/redis/redis.module";
import { ProfileModule } from "@/profile/profile.module";
import { TasksModule } from "@/tasks/tasks.module";
import { UsersModule } from "@/users/users.module";

import { validate } from "./env.validation";

@Module({
  imports: [
    NestLensModule.forRoot({
      enabled: process.env.NODE_ENV !== "production",
      rateLimit: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: seconds(60),
        limit: 20,
        skipIf(context) {
          const ctx = context.switchToHttp();
          return ctx.getRequest<ExpressRequest>().url.includes("nestlens");
        },
      },
    ]),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "common", "i18n"),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    RedisModule,
    MailerModule,
    ProfileModule,
    TasksModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: I18nThrottlerGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
