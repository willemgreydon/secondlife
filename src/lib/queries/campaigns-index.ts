// src/lib/queries/campaigns-index.ts
import { client } from "@/lib/sanity.client";
import { campaignsListQuery } from "@/lib/sanity.queries";

/**
 * Campaigns-Index: Liste aller Campaigns für /campaigns
 */
export async function getCampaignsIndex() {
  const campaigns = await client.fetch(campaignsListQuery);
  return { campaigns };
}
