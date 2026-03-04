import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

export async function getAllPartners() {
  return client.fetch(
    groq`
      *[_type == "partner"] | order(name asc){
        _id,
        name,
        "slug": slug.current,
        website,

        "logo": {
          "url": logo.asset->url,
          "alt": logo.alt
        },

        "logoDark": {
          "url": logoDark.asset->url,
          "alt": logoDark.alt
        }
      }
    `
  );
}