// src/lib/queries/event.ts
import { client } from "@/lib/sanity.client";
import { eventBySlugQuery } from "@/lib/sanity.queries";

/**
 * Event-Detail per Slug
 */
export async function getEventBySlug(slug: string) {
  if (!slug) return null;
  return client.fetch(eventBySlugQuery, { slug });
}
