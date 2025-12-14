// src/lib/queries/event.ts
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

export async function getEventBySlug(slug: string) {
  if (!slug) return null;

  return client.fetch(
    groq`*[_type == "event" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      location,
      date,
      "coverUrl": cover.asset->url,
      content[]{
        ...,
        _type,
        _key
      }
    }`,
    { slug }
  );
}
