// src/lib/queries/initiatives-index.ts
import { client } from "@/lib/sanity.client";
import { initiativesListQuery } from "@/lib/sanity.queries";

/**
 * Initiatives-Index: Liste aller Initiativen für /initiatives
 */
export async function getInitiativesIndex() {
  const initiatives = await client.fetch(initiativesListQuery);
  return { initiatives };
}
