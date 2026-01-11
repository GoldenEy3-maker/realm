import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ResponseInterceptor } from "./response/response.interceptor";
import { HttpExceptionFilter } from "./response/http-exception.filter";
import { OpenApiReference } from "./openapi/openapi.reference";
import { RequestMethod, VERSION_NEUTRAL, VersioningType } from "@nestjs/common";
import { ValidationPipe } from "./validation/validation.pipe";
import helmet from "helmet";
import { HelmetConfig } from "./helmet.config";
import { I18nMiddleware } from "nestjs-i18n";

async function bootstrap() {
  const corsOrigins = process.env.AVAILABLE_CORS_ORIGINS?.split(",") ?? [];
  const isProduction = process.env.NODE_ENV === "production";

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({ origin: corsOrigins });

  app.setGlobalPrefix("api", {
    exclude: [
      { path: "nestlens", method: RequestMethod.ALL },
      { path: "nestlens/(.*)", method: RequestMethod.ALL },
      { path: "__nestlens__/(.*)", method: RequestMethod.ALL },
    ],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet(HelmetConfig.getStaticConfig(isProduction)));
  app.use("/v1", helmet(HelmetConfig.getApiConfig(isProduction)));
  app.use("/docs", helmet(HelmetConfig.getDocsConfig(isProduction)));

  app.use(I18nMiddleware);

  await new OpenApiReference().setup(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
