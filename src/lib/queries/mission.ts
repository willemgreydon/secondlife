// src/lib/queries/mission.ts
import { client } from "@/lib/sanity.client";
import { missionBySlugQuery } from "@/lib/sanity.queries";

/**
 * Missions-Detail per Slug
 */
export async function getMissionBySlug(slug: string) {
  if (!slug) return null;
  return client.fetch(missionBySlugQuery, { slug });
}
