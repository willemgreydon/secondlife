// src/lib/queries/partners-index.ts
import { groq } from "next-sanity";
import { getServerClient } from "@/lib/sanity.preview";

export async function getAllPartners() {
  const client = await getServerClient();
  return client.fetch(groq`*[_type == "partner"] | order(name asc)`);
}
