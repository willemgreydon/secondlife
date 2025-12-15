import { groq } from "next-sanity"
import { client } from "@/lib/sanity.client"

/**
 * Fetch single page by slug
 * Defensive: never send undefined params to Sanity
 */
export async function getPageBySlug(slug?: string) {
  if (!slug) return null

  return client.fetch(
    groq`
      *[_type == "page" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        content
      }
    `,
    { slug }
  )
}

/**
 * Fetch ALL operation pages
 * Used by generateStaticParams()
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
          "dana-24-vlc"
        ]
      ]{
        slug
      }
    `
  )
}
