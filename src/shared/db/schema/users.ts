import { profiles } from "./profiles";
import {
  createTable,
  text,
  timestampMetadataFields,
  uniqueIndex,
  uuid,
  varchar,
  boolean,
  timestamp,
  createRelations,
} from "../utils";

export const users = createTable(
  "users",
  {
    id: uuid("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 15 }).notNull(),
    password: text("password").notNull(),
    username: varchar("username", { length: 50 }).unique(),
    isActive: boolean("is_active").notNull().default(true),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    phoneVerified: timestamp("phone_verified", { mode: "date" }),
    lastLogin: timestamp("last_login", { mode: "date" }),
    ...timestampMetadataFields,
  },
  (table) => [
    uniqueIndex("email_index").on(table.email),
    uniqueIndex("username_index").on(table.username),
  ]
);

export const usersRelations = createRelations(users, ({ one }) => ({
  profile: one(profiles),
}));
