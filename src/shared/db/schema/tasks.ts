import {
  boolean,
  createTable,
  index,
  text,
  timestampMetadataFields,
  uuid,
  varchar,
} from "../utils";

export const tasks = createTable(
  "tasks",
  {
    id: uuid("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    completed: boolean("completed").notNull().default(false),
    ...timestampMetadataFields,
  },
  (table) => [index("taks_title_index").on(table.title)]
);
