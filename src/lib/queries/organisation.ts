// src/lib/queries/organisation.ts
import { getPageBySlug } from "./page";

export function getOrganisationPage() {
  return getPageBySlug("organisation");
}
