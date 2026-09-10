import path, { join } from "node:path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { seconds, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request as ExpressRequest } from "express";
import { AcceptLanguageResolver, I18nModule } from "nestjs-i18n";

import { AuthModule } from "@/auth/auth.module";
import { I18nThrottlerGuard } from "@/common/throttler/i18n-throttler.guard";
import { dataSourceOptions } from "@/infrastructure/db/datasource";
import { MailerModule } from "@/infrastructure/mailer/mailer.module";
import { RedisModule } from "@/infrastructure/redis/redis.module";
import { ProfileModule } from "@/profile/profile.module";
import { TasksModule } from "@/tasks/tasks.module";
import { UsersModule } from "@/users/users.module";

import { Environment, validate } from "./env.validation";
import { createNestlensModuleForRoot, nestLensEnabled } from "./infrastructure/nestlens";

@Module({
  imports: [
    createNestlensModuleForRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    // TODO: need to enhance 429 status response with meta information about throttle like remaining attempts and retry-after
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: seconds(60),
        limit: 100,
        skipIf(context) {
          if (nestLensEnabled) {
            const ctx = context.switchToHttp();
            return ctx.getRequest<ExpressRequest>().url.includes("nestlens");
          }

          return false;
        },
      },
    ]),
    I18nModule.forRoot({
      fallbackLanguage: "ru",
      loaderOptions: {
        path: path.join(__dirname, "common", "i18n"),
        watch: process.env.NODE_ENV === Environment.Development,
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
