import {
  relations,
  schemaBuilder,
  table,
  timestampMetadataFields,
} from "../utils";
import { profiles } from "./profiles";

export const users = table(
  "users",
  {
    id: schemaBuilder.uuid("id").primaryKey(),
    email: schemaBuilder.varchar("email", { length: 256 }).notNull().unique(),
    username: schemaBuilder.varchar("username", { length: 50 }).unique(),
    isActive: schemaBuilder.boolean("is_active").notNull().default(true),
    emailVerified: schemaBuilder.timestamp("email_verified", { mode: "date" }),
    phoneVerified: schemaBuilder.timestamp("phone_verified", { mode: "date" }),
    lastLogin: schemaBuilder.timestamp("last_login", { mode: "date" }),
    tokenVersion: schemaBuilder.integer("token_version").notNull().default(0),
    ...timestampMetadataFields,
  },
  (table) => [
    schemaBuilder.uniqueIndex("users_email_unique_index").on(table.email),
    schemaBuilder.uniqueIndex("users_username_unique_index").on(table.username),
  ],
);

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles),
}));
