import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import path, { join } from "node:path";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { validate } from "./env.validation";
import { dataSourceOptions } from "./db/datasource";
import { AuthModule } from "./auth/auth.module";
import { RedisModule } from "./redis/redis.module";
import { MailerModule } from "./mailer/mailer.module";
import { ProfileModule } from "./profile/profile.module";
import { TasksModule } from "./tasks/tasks.module";
import { NestLensModule } from "nestlens";
import { ThrottlerModule, seconds } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { Request as ExpressRequest } from "express";
import { AcceptLanguageResolver, I18nModule } from "nestjs-i18n";
import { I18nThrottlerGuard } from "./throttler/i18n-throttler.guard";

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
        path: path.join(__dirname, "/i18n/"),
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
