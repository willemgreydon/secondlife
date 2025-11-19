import groq from "groq";
import { client } from "../sanity.client";

export async function getMissionBySlug(slug: string) {
  return await client.fetch(
    groq`
    *[_type == "mission" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      status,
      excerpt,
      "coverUrl": cover.asset->url,
      "fallbackUrl": fallback.asset->url,
      gallery[]{
        "url": asset->url,
        alt,
        caption
      },
      metrics[]{
        metric_key,
        title,
        current_value,
        unit,
        description
      },
      content[]{
        ...,
        _type == "imageBlock" => {
          ...,
          "url": image.asset->url
        },
        _type == "splitSection" => {
          ...,
          "leftImage": leftImage.asset->url,
          "rightImage": rightImage.asset->url
        },
        _type == "videoSection" => {
          ...,
          "videoUrl": video.asset->url
        }
      }
    }
    `,
    { slug }
  );
}
