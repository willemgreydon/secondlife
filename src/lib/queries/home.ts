// src/lib/queries/home.ts
import { getPageBySlug } from "./page";

export function getHomePage() {
  return getPageBySlug("home");
}
