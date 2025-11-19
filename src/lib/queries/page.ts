// src/lib/queries/page.ts
import { client } from "@/lib/sanity.client";
import { pageBySlugQuery, pageSlugsQuery } from "@/lib/sanity.queries";

/**
 * Generische Page per Slug laden (inkl. normalisiertem CONTENT)
 */
export async function getPageBySlug(slug: string) {
  if (!slug) return null;
  return client.fetch(pageBySlugQuery, { slug });
}

/**
 * Alle Page-Slugs (für Sitemaps, statische Pfade, etc.)
 */
export async function getAllPages() {
  return client.fetch(pageSlugsQuery);
}
