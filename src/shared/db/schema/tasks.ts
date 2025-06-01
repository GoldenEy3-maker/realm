import { timestampMetadataFields, table, t, uuid } from "../utils";

export const tasks = table(
  "tasks",
  {
    id: uuid("id").primaryKey(),
    title: t.varchar("title", { length: 256 }).notNull(),
    description: t.text("description"),
    completed: t.boolean("completed").notNull().default(false),
    ...timestampMetadataFields,
  },
  (table) => [t.index("taks_title_index").on(table.title)],
);
