import type { OrganizationDomain } from "../model/organization-domain";

export function getFallbackLogoOrganization(organization: OrganizationDomain) {
  return organization.name.slice(0, 2);
}
