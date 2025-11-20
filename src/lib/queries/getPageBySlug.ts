import { groq } from "next-sanity";
import { client } from "../client";

export async function getPageBySlug(slug: string) {
  return client.fetch(
    groq`
      *[_type == "page" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        status,
        excerpt,
        sections[]{
          ...,
          // HeroBlock
          _type == "heroBlock" => {
            ...,
            "imageUrl": image.asset->url
          },
          // ImageBlocks, SplitSections, etc.
          _type == "imageBlock" => {
            ...,
            "url": image.asset->url
          },
          _type == "galleryBlock" => {
            ...,
            items[]{
              ...,
              "url": image.asset->url
            }
          }
        }
      }
    `,
    { slug }
  );
}
