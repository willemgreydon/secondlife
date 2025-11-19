// src/lib/queries/blog.ts
import { groq } from "next-sanity";
import { getServerClient } from "@/lib/sanity.preview";

export async function getAllBlogSlugs() {
  const client = await getServerClient();
  return client.fetch(groq`*[_type == "post" && defined(slug.current)][].slug.current`);
}

export async function getAllBlogPosts() {
  const client = await getServerClient();
  return client.fetch(
    groq`*[_type == "post"] | order(_createdAt desc){
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    }`
  );
}
