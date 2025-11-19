// src/lib/queries/missions-index.ts
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

export async function getAllMissions() {
  return client.fetch(groq`
    *[_type == "mission"] | order(_createdAt desc){
      _id,
      title,
      "slug": slug.current,
      status,
      excerpt,
      "coverUrl": coalesce(
        cover.asset->url,
        fallback.asset->url,
        image.asset->url,
        gallery[0].asset->url
      ),
      "wasteCollectedKg": coalesce(
        metrics[metric_key == "plastic_collected_kg"][0].current_value,
        metrics[metric_key == "tons_collected"][0].current_value * 1000,
        0
      ),
      "volunteers": coalesce(
        metrics[metric_key == "volunteers"][0].current_value,
        0
      )
    }
  `);
}
