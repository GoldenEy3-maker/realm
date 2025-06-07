import { timestampMetadataFields, table, schemaBuilder } from "../utils";

export const tasks = table(
  "tasks",
  {
    id: schemaBuilder.uuid("id").primaryKey(),
    title: schemaBuilder.varchar("title", { length: 256 }).notNull(),
    description: schemaBuilder.text("description"),
    completed: schemaBuilder.boolean("completed").notNull().default(false),
    ...timestampMetadataFields,
  },
  (table) => [schemaBuilder.index("taks_title_index").on(table.title)],
);
