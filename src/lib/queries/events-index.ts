// src/lib/queries/events-index.ts
import { client } from "@/lib/sanity.client";
import { eventsListQuery } from "@/lib/sanity.queries";

/**
 * Events-Index: Liste aller Events (für /events)
 */
export async function getEventsIndex() {
  const events = await client.fetch(eventsListQuery);
  return { events };
}
