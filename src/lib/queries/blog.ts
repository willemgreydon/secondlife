import { groq } from "next-sanity"
import { getServerClient } from "@/lib/sanity.preview"

export async function getAllBlogSlugs(): Promise<string[]> {
  const client = await getServerClient()
  return client.fetch(
    groq`*[_type == "post" && defined(slug.current)].slug.current`
  )
}

export async function getAllBlogPosts() {
  const client = await getServerClient()
  return client.fetch(
    groq`
      *[_type == "post"]
      | order(publishedAt desc){
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        "coverUrl": cover.asset->url
      }
    `
  )
}
