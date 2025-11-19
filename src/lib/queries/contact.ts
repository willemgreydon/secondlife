// src/lib/queries/contact.ts
import { getPageBySlug } from "./page";

export function getContactPage() {
  return getPageBySlug("contact");
}
