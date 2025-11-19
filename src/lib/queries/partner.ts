// src/lib/queries/partner.ts
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

export async function getPartnerBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "partner" && slug.current == $slug][0]{
      _id,
      title,
      url,
      "slug": slug.current,
      "logo": coalesce(logo.asset->url, image.asset->url),
      bio,
      ${/* optional: reuse full content projection */ ""}
      ${/* if partner has content sections */ ""}
      "content": coalesce(content, contentSections, sections, [])
    }`,
    { slug }
  );
}
