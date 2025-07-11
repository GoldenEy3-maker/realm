import { relations as drizzleRelations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import * as pgCore from "drizzle-orm/pg-core";

export const table = pgTable;
export const createEnum = pgEnum;
export const relations = drizzleRelations;

export const timestampMetadataFields = {
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

const uuid = (name: string) => {
  return text(name).$defaultFn(() => crypto.randomUUID());
};

export const schemaBuilder = {
  ...pgCore,
  uuid,
};
