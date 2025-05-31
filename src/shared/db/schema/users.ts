import { profiles } from "./profiles";
import { table, timestampMetadataFields, relations, t, uuid } from "../utils";

export const users = table(
  "users",
  {
    id: uuid("id").primaryKey(),
    email: t.varchar("email", { length: 256 }).notNull().unique(),
    phone: t.varchar("phone", { length: 15 }).notNull(),
    password: t.text("password").notNull(),
    username: t.varchar("username", { length: 50 }).unique(),
    isActive: t.boolean("is_active").notNull().default(true),
    emailVerified: t.timestamp("email_verified", { mode: "date" }),
    phoneVerified: t.timestamp("phone_verified", { mode: "date" }),
    lastLogin: t.timestamp("last_login", { mode: "date" }),
    ...timestampMetadataFields,
  },
  (table) => [
    t.uniqueIndex("email_index").on(table.email),
    t.uniqueIndex("username_index").on(table.username),
  ]
);

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles),
}));
