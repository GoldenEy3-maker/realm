import {
  createEnum,
  relations,
  schemaBuilder,
  table,
  timestampMetadataFields,
} from "../utils";
import { users } from "./users";

export const teams = table(
  "teams",
  {
    id: schemaBuilder.uuid("id").primaryKey(),
    name: schemaBuilder.varchar("name", { length: 256 }).notNull(),
    icon: schemaBuilder.varchar("icon", { length: 256 }),
    color: schemaBuilder.varchar("color", { length: 256 }),
    ...timestampMetadataFields,
  },
  (table) => [schemaBuilder.uniqueIndex("teams_name_unique").on(table.name)],
);

export const teamMemebersRoles = createEnum("team_members_roles", [
  "owner",
  "admin",
  "member",
]);

export const teamMembers = table(
  "team_members",
  {
    id: schemaBuilder.uuid("id").primaryKey(),
    teamId: schemaBuilder
      .uuid("team_id")
      .references(() => teams.id, { onDelete: "cascade" }),
    userId: schemaBuilder
      .uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" }),
    role: teamMemebersRoles("role").notNull().default("member"),
    ...timestampMetadataFields,
  },
  (table) => [
    schemaBuilder
      .uniqueIndex("team_members_team_id_user_id_unique")
      .on(table.teamId, table.userId),
  ],
);

export const teamMemberRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
}));

export const teamRelations = relations(teams, ({ many }) => ({
  members: many(teamMembers),
}));
