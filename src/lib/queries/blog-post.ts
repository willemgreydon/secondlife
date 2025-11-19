// src/lib/queries/blog-post.ts
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

/**
 * Blogpost-Detail per Slug
 */
const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    ...
  }
`;

export async function getPostBySlug(slug: string) {
  if (!slug) return null;
  return client.fetch(blogPostBySlugQuery, { slug });
}
