import {
  relations,
  schemaBuilder,
  table,
  timestampMetadataFields,
} from "../schema-utils";
import { users } from "./users";

export const profiles = table("profiles", {
  id: schemaBuilder.uuid("id").primaryKey(),
  userId: schemaBuilder
    .uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  lastName: schemaBuilder.varchar("last_name", { length: 256 }).notNull(),
  firstName: schemaBuilder.varchar("first_name", { length: 256 }).notNull(),
  middleName: schemaBuilder.varchar("middle_name", { length: 256 }),
  avatarUrl: schemaBuilder.text("avatar_url"),
  bio: schemaBuilder.text("bio"),
  dateOfBirth: schemaBuilder.date("date_of_birth"),
  ...timestampMetadataFields,
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));
