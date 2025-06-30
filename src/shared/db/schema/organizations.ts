import {
  relations,
  schemaBuilder,
  table,
  timestampMetadataFields,
} from "../utils";
import { users } from "./users";

export const organizations = table(
  "organizations",
  {
    id: schemaBuilder.uuid("id").primaryKey(),
    slug: schemaBuilder.varchar("slug", { length: 256 }).notNull().unique(),
    name: schemaBuilder.varchar("name", { length: 256 }).notNull(),
    description: schemaBuilder.text("description"),
    avatarUrl: schemaBuilder.text("avatar_url"),
    websiteUrl: schemaBuilder.text("website_url"),
    authorId: schemaBuilder
      .uuid("author_id")
      .references(() => users.id, { onDelete: "cascade" }),
    ...timestampMetadataFields,
  },
  (table) => [
    schemaBuilder.uniqueIndex("organizations_slug_unique_index").on(table.slug),
  ],
);

export const organizationMembers = table(
  "organization_members",
  {
    id: schemaBuilder.uuid("id").primaryKey(),
    organizationId: schemaBuilder
      .uuid("organization_id")
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: schemaBuilder.uuid("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    ...timestampMetadataFields,
  },
  (table) => [
    schemaBuilder
      .uniqueIndex("organization_user_unique")
      .on(table.organizationId, table.userId),
  ],
);

export const organizationsRelations = relations(
  organizations,
  ({ one, many }) => ({
    author: one(users, {
      fields: [organizations.authorId],
      references: [users.id],
    }),
    members: many(organizationMembers),
  }),
);

export const organizationMembersRelations = relations(
  organizationMembers,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationMembers.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [organizationMembers.userId],
      references: [users.id],
    }),
  }),
);
