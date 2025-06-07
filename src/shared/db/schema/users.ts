import { profiles } from "./profiles";
import {
  table,
  timestampMetadataFields,
  relations,
  schemaBuilder,
} from "../utils";
import { teamMembers } from "./teams";

export const users = table(
  "users",
  {
    id: schemaBuilder.uuid("id").primaryKey(),
    email: schemaBuilder.varchar("email", { length: 256 }).notNull().unique(),
    phone: schemaBuilder.varchar("phone", { length: 15 }).notNull(),
    password: schemaBuilder.text("password").notNull(),
    username: schemaBuilder.varchar("username", { length: 50 }).unique(),
    isActive: schemaBuilder.boolean("is_active").notNull().default(true),
    emailVerified: schemaBuilder.timestamp("email_verified", { mode: "date" }),
    phoneVerified: schemaBuilder.timestamp("phone_verified", { mode: "date" }),
    lastLogin: schemaBuilder.timestamp("last_login", { mode: "date" }),
    tokenVersion: schemaBuilder.integer("token_version").notNull().default(0),
    ...timestampMetadataFields,
  },
  (table) => [
    schemaBuilder.uniqueIndex("email_index").on(table.email),
    schemaBuilder.uniqueIndex("username_index").on(table.username),
  ],
);

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  teams: many(teamMembers),
}));
