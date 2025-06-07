import { users } from "./users";
import {
  table,
  timestampMetadataFields,
  schemaBuilder,
  relations,
} from "../utils";

export const profiles = table("profiles", {
  id: schemaBuilder.uuid("id").primaryKey(),
  userId: schemaBuilder
    .text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  surname: schemaBuilder.varchar("surname", { length: 256 }).notNull(),
  name: schemaBuilder.varchar("name", { length: 256 }).notNull(),
  patronymic: schemaBuilder.varchar("patronymic", { length: 256 }),
  avatarUrl: schemaBuilder.text("avatar_url"),
  bio: schemaBuilder.text("bio"),
  dateOfBirth: schemaBuilder.date("date_of_birth"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preferences: schemaBuilder.json("preferences").$type<Record<string, any>>(),
  socialLinks: schemaBuilder
    .json("social_links")
    .$type<Record<string, string>>(),
  ...timestampMetadataFields,
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));
