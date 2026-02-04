import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import {
  pageBySlugQuery,
  pageWithContentBySlugQuery,
} from "@/lib/sanity.queries";

/**
 * Lightweight page fetch (no enriched sections)
 * Use ONLY where grids are not required
 */
export async function getPageBySlug(slug?: string) {
  if (!slug) return null;

  return client.fetch(pageBySlugQuery, { slug });
}

/**
 * Full PageBuilder-ready fetch
 * REQUIRED for pages using grids (blog, missions, etc.)
 */
export async function getPageWithContentBySlug(slug: string) {
  if (!slug) return null;

  return client.fetch(pageWithContentBySlugQuery, { slug });
}

/**
 * Fetch all operation pages
 * Used for generateStaticParams()
 */
export async function getAllOperationPages() {
  return client.fetch(
    groq`
      *[
        _type == "page"
        && defined(slug.current)
        && slug.current in [
          "beach-cleanups",
          "revolutionizing-beach-cleanups",
          "dana-24-valencia"
        ]
      ]{
        "slug": slug.current
      }
    `
  );
}
