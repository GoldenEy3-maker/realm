import { schemaBuilder, table, timestampMetadataFields } from "../schema-utils";

export const tasks = table(
  "tasks",
  {
    id: schemaBuilder.uuid("id").primaryKey(),
    slug: schemaBuilder.varchar("slug", { length: 256 }).notNull().unique(),
    title: schemaBuilder.varchar("title", { length: 256 }).notNull(),
    serialNumber: schemaBuilder.integer("serial_number").notNull().unique(),
    description: schemaBuilder.text("description"),
    completed: schemaBuilder.boolean("completed").notNull().default(false),
    ...timestampMetadataFields,
  },
  (table) => [
    schemaBuilder.index("tasks_title_index").on(table.title),
    schemaBuilder
      .uniqueIndex("tasks_serial_number_unique_index")
      .on(table.serialNumber),
    schemaBuilder.uniqueIndex("tasks_slug_unique_index").on(table.slug),
  ],
);
