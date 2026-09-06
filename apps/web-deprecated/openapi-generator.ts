import { mkdir, writeFile } from "fs/promises";
import openapiTS, { astToString } from "openapi-typescript";
import { resolve } from "path";
import { factory } from "typescript";

interface OpenApiGeneratorOptions {
  openapiUrl: string;
  outputDir: string;
}

class OpenApiGenerator {
  private readonly options: OpenApiGeneratorOptions;

  constructor(options: OpenApiGeneratorOptions) {
    this.options = options;
  }

  async generate() {
    await this.waitForBackend();

    const source = await this.fetchOpenApi();

    const ast = await this.getOpenApiAst(source);

    const generatedCode = astToString(ast);
    const codeWithConstEnums = this.transformEnumsToConst(generatedCode);

    await this.saveOpenApi(codeWithConstEnums);
  }

  private async waitForBackend(maxRetries = 30, retryDelay = 1000) {
    console.log("⏳ Waiting for backend to be ready...");

    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(this.options.openapiUrl, {
          method: "HEAD",
        });

        if (response.ok) {
          console.log("🔥 Backend is ready!");
          return;
        }
      } catch {
        // Backend not ready yet, continue waiting
      }

      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    throw new Error(
      `❌ Backend did not become available after ${maxRetries} attempts. ` +
        `Make sure the backend is running at ${this.options.openapiUrl}`,
    );
  }

  private async fetchOpenApi() {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    const response = await fetch(this.options.openapiUrl, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`❌ Failed to fetch OpenAPI (${response.status} ${response.statusText})`);
    }

    const source = await response.text();

    return source;
  }

  private async getOpenApiAst(source: string) {
    const BLOB = factory.createTypeReferenceNode(factory.createIdentifier("Blob"));
    const NULL = factory.createLiteralTypeNode(factory.createNull());

    return openapiTS(source, {
      enum: true,
      alphabetize: true,
      rootTypes: true,
      rootTypesNoSchemaPrefix: true,
      transform(schemaObject) {
        if (schemaObject.format === "binary") {
          if (schemaObject.nullable) {
            return factory.createUnionTypeNode([BLOB, NULL]);
          }
          return BLOB;
        }
        return undefined;
      },
    });
  }

  private transformEnumsToConst(generatedCode: string): string {
    const enumPattern = /export enum (\w+) \{([^}]+)\}/g;

    return generatedCode.replace(enumPattern, (_match, enumName, enumBody) => {
      const entries = enumBody
        .trim()
        .split(",")
        .map((entry: string) => entry.trim())
        .filter((entry: string) => entry.length > 0);

      const constEntries = entries
        .map((entry: string) => {
          const cleaned = entry.replace(/\/\*.*?\*\//g, "").trim();
          const objectSyntax = cleaned.replace(/\s*=\s*/, ": ");
          return `  ${objectSyntax}`;
        })
        .join(",\n");

      return [
        `export const ${enumName} = {`,
        constEntries,
        `} as const;`,
        ``,
        `export type ${enumName} = (typeof ${enumName})[keyof typeof ${enumName}];`,
      ].join("\n");
    });
  }

  private async saveOpenApi(contents: string) {
    await mkdir(this.options.outputDir, { recursive: true });
    await writeFile(resolve(this.options.outputDir, "openapi.ts"), contents);
  }
}

async function bootstrap() {
  const openapiUrl = process.env.OPENAPI_URL;

  if (!openapiUrl) {
    throw new Error("OPENAPI_URL is not set");
  }

  const start = performance.now();
  console.log("🔄 Generating OpenAPI...");

  const generator = new OpenApiGenerator({
    openapiUrl,
    outputDir: "__generated__",
  });

  await generator.generate();

  const end = performance.now();
  const formattedTime = Math.floor((end - start) / 1000);

  console.log(`✅ OpenAPI generated successfully in ${formattedTime} seconds`);
}

void bootstrap();
