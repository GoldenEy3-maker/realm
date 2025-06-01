import { users } from "./users";
import { table, timestampMetadataFields, t, uuid, relations } from "../utils";

export const profiles = table("profiles", {
  id: uuid("id").primaryKey(),
  userId: t.text("user_id").notNull(),
  surname: t.varchar("surname", { length: 256 }).notNull(),
  name: t.varchar("name", { length: 256 }).notNull(),
  patronymic: t.varchar("patronymic", { length: 256 }),
  avatarUrl: t.text("avatar_url"),
  bio: t.text("bio"),
  dateOfBirth: t.date("date_of_birth"),
  gender: t.varchar("gender", { length: 20 }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preferences: t.json("preferences").$type<Record<string, any>>(),
  socialLinks: t.json("social_links").$type<Record<string, string>>(),
  ...timestampMetadataFields,
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));
