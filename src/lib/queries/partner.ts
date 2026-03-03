// src/lib/queries/partner.ts

import { client } from "@/lib/sanity.client";
import { partnerBySlugQuery } from "@/lib/sanity.queries";

export async function getPartnerBySlug(slug: string) {
  return client.fetch(partnerBySlugQuery, { slug });
}