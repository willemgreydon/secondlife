import { client } from "@/lib/sanity.client"
import { blogPostBySlugQuery } from "@/lib/sanity.queries"

export async function getPostBySlug(slug: string) {
  if (!slug) return null
  return client.fetch(blogPostBySlugQuery, { slug })
}
