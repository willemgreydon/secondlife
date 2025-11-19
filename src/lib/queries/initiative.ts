// src/lib/queries/initiative.ts
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const initiativeBySlugQuery = groq`
  *[_type == "initiative" && slug.current == $slug][0]{
    ...
  }
`;

/**
 * Initiative-Detail per Slug
 */
export async function getInitiativeBySlug(slug: string) {
  if (!slug) return null;
  return client.fetch(initiativeBySlugQuery, { slug });
}
