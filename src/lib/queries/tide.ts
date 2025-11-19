// src/lib/queries/tide.ts
import { getPageBySlug } from "./page";

export function getTidePage() {
  return getPageBySlug("tide");
}
