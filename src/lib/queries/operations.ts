// src/lib/queries/operations.ts
import { getPageBySlug } from "./page";

export function getOperationsPage() {
  return getPageBySlug("operations");
}
