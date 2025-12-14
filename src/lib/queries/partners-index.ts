import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

export async function getAllPartners() {
  return client.fetch(
    groq`
      *[_type == "partner"]{
        _id,
        name,
        "slug": slug.current,
        website,
        logo{
          asset->{
            url
          },
          alt
        }
      }
    `
  );
}
