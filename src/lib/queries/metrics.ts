// src/lib/queries/metrics.ts
import { groq } from "next-sanity";
import { getServerClient } from "@/lib/sanity.preview";

export async function getAllMetrics() {
  const client = await getServerClient();
  return client.fetch(groq`*[_type == "metric"] | order(metric_key asc)`);
}
