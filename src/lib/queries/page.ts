import { groq } from "next-sanity"
import { client } from "@/lib/sanity.client"
import {
  pageBySlugQuery,
  pageWithContentBySlugQuery,
} from "@/lib/sanity.queries"

/* ---------------------------------------------------------
   TYPES
--------------------------------------------------------- */

export type PageSlug = {
  slug: string
}

/* ---------------------------------------------------------
   PAGE FETCHERS
--------------------------------------------------------- */

/**
 * Lightweight page fetch (no enriched sections)
 * Use ONLY where grids are not required
 */
export async function getPageBySlug(slug?: string) {
  if (!slug) return null
  return client.fetch(pageBySlugQuery, { slug })
}

/**
 * Full PageBuilder-ready fetch
 * REQUIRED for pages using grids (blog, missions, etc.)
 */
export async function getPageWithContentBySlug(slug: string) {
  if (!slug) return null
  return client.fetch(pageWithContentBySlugQuery, { slug })
}

/* ---------------------------------------------------------
   OPERATION SLUGS (STATIC ROUTING)
--------------------------------------------------------- */

/**
 * Fetch all operation pages
 * GUARANTEED: slug is always a string
 */
export async function getAllOperationPages(): Promise<PageSlug[]> {
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
  )
}
