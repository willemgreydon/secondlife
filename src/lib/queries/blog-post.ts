import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

/**
 * Blog post detail
 * Supports both: new "blogPost" and legacy "post"
 * Always returns a normalized content array.
 */
export const blogPostBySlugQuery = groq`
  *[
    _type in ["blogPost", "post"] &&
    slug.current == $slug
  ][0]{
    _id,
    _type,
    title,
    excerpt,
    publishedAt,

    "content": select(
      defined(content) && count(content) > 0 => content,
      defined(contentSections) && count(contentSections) > 0 => contentSections,
      defined(sections) && count(sections) > 0 => sections,
      []
    )[] {
      ...,

      _type == "heroSection" => {
        _type,
        _key,
        eyebrow,
        title,
        subtitle,
        ctaHref,
        "ctaText": coalesce(ctaText, ctaLabel),
        "bgImage": coalesce(image, bgImage)
      },

      _type == "gallerySection" => {
        _type,
        _key,
        columns,
        images[] {
          _key,
          alt,
          caption,
          asset->{
            _id,
            url,
            metadata { dimensions }
          }
        }
      }
    }
  }
`;

export async function getPostBySlug(slug: string) {
  if (!slug) return null;
  return client.fetch(blogPostBySlugQuery, { slug });
}
