import { client } from "@/lib/sanity.client";
import { pageWithContentBySlugQuery } from "@/lib/sanity.queries";

/**
 * Fetch page by slug
 */
export async function getPageBySlug(slug: string) {
  if (!slug) return null;
  return client.fetch(pageWithContentBySlugQuery, { slug });
}
