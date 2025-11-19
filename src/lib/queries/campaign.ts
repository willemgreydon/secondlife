// src/lib/queries/campaign.ts
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const campaignBySlugQuery = groq`
  *[_type == "campaign" && slug.current == $slug][0]{
    ...
  }
`;

/**
 * Campaign-Detail per Slug
 */
export async function getCampaignBySlug(slug: string) {
  if (!slug) return null;
  return client.fetch(campaignBySlugQuery, { slug });
}
