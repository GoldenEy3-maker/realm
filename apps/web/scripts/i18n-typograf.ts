/* eslint-disable no-console */
/**
 * Script for applying typography to all translations in JSON files
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import Typograf from "typograf";

import { typografConfig } from "@/core/typograf/typografConfig.ts";

const tp = new Typograf(typografConfig);

interface I18nObject {
  [key: string]: string | I18nObject;
}

class I18nTypograf {
  constructor(private readonly typograf: Typograf) {}

  public processTranslationFiles(translationDir: string) {
    const files = readdirSync(translationDir, { recursive: true }).filter(
      (f) => typeof f === "string" && f.endsWith(".json"),
    ) as string[];

    for (const file of files) {
      const filePath = path.join(translationDir, file);
      const data = this.processTranslationFile(filePath);

      this.saveTranslationFile(filePath, data);
      console.log(`\n✅ ${filePath} processed!`);
    }
  }

  private saveTranslationFile(filePath: string, data: I18nObject) {
    const jsonString = JSON.stringify(data, null, 2).replace(/\\\\u([0-9a-fA-F]{4})/g, "\\u$1");
    writeFileSync(filePath, jsonString + "\n", "utf-8");
  }

  private processTranslationFile(filePath: string) {
    try {
      const content = readFileSync(filePath, "utf-8");
      const data = JSON.parse(content) as I18nObject;
      return this.processObject(data);
    } catch (e) {
      console.error(e);
      throw new Error(`\n❌ Failed to process ${filePath}`);
    }
  }

  private processObject(obj: I18nObject) {
    const result: I18nObject = {};

    for (const [key, value] of Object.entries(obj)) {
      result[key] =
        typeof value === "string" ? this.typograf.execute(value) : this.processObject(value);
    }

    return result;
  }
}

function bootstrap() {
  console.log("\n🔄 Start typograf translation files");

  const translationsDir = path.join(process.cwd(), "messages");

  const i18nTypograf = new I18nTypograf(tp);

  i18nTypograf.processTranslationFiles(translationsDir);

  console.log("\n✅ All translations processed!");
}

bootstrap();
