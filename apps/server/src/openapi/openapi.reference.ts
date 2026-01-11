import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { ProfileModule } from "../profile/profile.module";
import { TasksModule } from "../tasks/tasks.module";
import { ErrorResponseDto, ResponseDto } from "../response/dto/response.dto";

export class OpenApiReference {
  async setup(app: NestExpressApplication) {
    const document = this.generateDocument(app);

    await this.saveDocument(document);

    app.use(
      "/docs/api",
      apiReference({ theme: "deepSpace", url: "api.json", hideClientButton: true }),
    );
  }

  private generateDocument(app: NestExpressApplication) {
    const config = new DocumentBuilder()
      .setTitle("Realm API")
      .setVersion("0.1")
      .addTag("realm")
      .addServer("/api", "API Server")
      .addGlobalResponse({
        status: 500,
        description: "Internal server error",
      })
      .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        description: "Enter the token with the `Bearer` prefix, e.g. `Bearer <token>`",
        in: "header",
      })
      .addGlobalParameters({
        name: "Accept-Language",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
      })
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseDto, ErrorResponseDto],
      include: [UsersModule, AuthModule, ProfileModule, TasksModule],
    });

    const pathsWithoutPrefix: Record<string, any> = {};

    for (const [path, value] of Object.entries(document.paths)) {
      const newPath = path.replace(/^\/api/, "");
      pathsWithoutPrefix[newPath] = value;
    }

    document.paths = pathsWithoutPrefix;

    return document;
  }

  private async saveDocument(document: OpenAPIObject) {
    try {
      await stat("public/docs");
    } catch {
      await mkdir("public/docs", { recursive: true });
    }

    await writeFile("public/docs/api.json", JSON.stringify(document));
  }
}
