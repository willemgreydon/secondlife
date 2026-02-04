import { groq } from "next-sanity";
import { getServerClient } from "@/lib/sanity.preview";

/**
 * Blog listing / slugs
 * Supports both "blogPost" and legacy "post"
 */

export async function getAllBlogSlugs() {
  const client = await getServerClient();
  return client.fetch(
    groq`*[_type in ["blogPost","post"] && defined(slug.current)][].slug.current`
  );
}

export async function getAllBlogPosts() {
  const client = await getServerClient();
  return client.fetch(
    groq`
      *[_type in ["blogPost","post"]] | order(coalesce(publishedAt, _createdAt) desc){
        _id,
        _type,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt
      }
    `
  );
}
