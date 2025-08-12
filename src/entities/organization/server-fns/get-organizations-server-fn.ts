import { createServerFn } from "@tanstack/react-start";
import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/shared/db";
import {
  organizationMembers,
  organizations,
} from "@/shared/db/schema/organizations";
import { authMiddelware } from "@/shared/lib/auth";

export const getOrganizationsServerFn = createServerFn({
  method: "GET",
})
  .middleware([authMiddelware])
  .handler(({ context }) => {
    const memberOrganizationIds = db
      .select({ organizationId: organizationMembers.organizationId })
      .from(organizationMembers)
      .where(eq(organizationMembers.userId, context.session.user.id));

    return db.query.organizations.findMany({
      where: and(
        eq(organizations.authorId, context.session.user.id),
        inArray(organizations.id, memberOrganizationIds),
      ),
    });
  });
