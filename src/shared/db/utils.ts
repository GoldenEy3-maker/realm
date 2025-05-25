import { relations } from "drizzle-orm";
import { pgEnum, pgTable, PgUUID, text, timestamp } from "drizzle-orm/pg-core";

export const createTable = pgTable;

export const createEnum = pgEnum;

export const timestampMetadataFields = {
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const uuid = (name: string) => {
  return text(name).$defaultFn(() => crypto.randomUUID());
};

export const createRelations = relations;

export * from "drizzle-orm/pg-core";
