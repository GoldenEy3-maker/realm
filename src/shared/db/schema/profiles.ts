import { users } from "./users";
import {
  createTable,
  text,
  timestampMetadataFields,
  uuid,
  varchar,
  json,
  date,
  createRelations,
} from "../utils";

export const profiles = createTable("profiles", {
  id: uuid("id").primaryKey(),
  userId: text("user_id").notNull(),
  surname: varchar("surname", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  patronymic: varchar("patronymic", { length: 255 }),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  dateOfBirth: date("date_of_birth"),
  gender: varchar("gender", { length: 20 }),
  preferences: json("preferences").$type<Record<string, any>>(),
  socialLinks: json("social_links").$type<Record<string, string>>(),
  ...timestampMetadataFields,
});

export const profilesRelations = createRelations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));
