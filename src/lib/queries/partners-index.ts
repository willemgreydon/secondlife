// lib/queries/partners-index.ts
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

export async function getAllPartners() {
  return client.fetch(groq`
    *[_type == "partner"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      website,
      "logo": logo.asset->url
    }
  `);
}
