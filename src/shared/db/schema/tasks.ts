import { schemaBuilder, table, timestampMetadataFields } from "../utils";

export const tasks = table(
  "tasks",
  {
    id: schemaBuilder.uuid("id").primaryKey(),
    slug: schemaBuilder.varchar("slug", { length: 256 }).notNull().unique(),
    title: schemaBuilder.varchar("title", { length: 256 }).notNull(),
    description: schemaBuilder.text("description"),
    completed: schemaBuilder.boolean("completed").notNull().default(false),
    ...timestampMetadataFields,
  },
  (table) => [
    schemaBuilder.index("taks_title_index").on(table.title),
    schemaBuilder.uniqueIndex("taks_slug_unique_index").on(table.slug),
  ],
);
