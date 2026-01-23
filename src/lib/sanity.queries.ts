// ---------------------------------------------------------
// sanity.queries.ts — STABLE, NON-EMPTY CONTENT (FINAL)
// ---------------------------------------------------------
import { groq } from "next-sanity";

/**
 * Pick the FIRST NON-EMPTY content array.
 * (Empty arrays are "defined" in GROQ and must be ignored.)
 */
const normalizedContentExpr = `
  select(
    defined(contentSections) && count(contentSections) > 0 => contentSections,
    defined(content) && count(content) > 0 => content,
    defined(sections) && count(sections) > 0 => sections,
    []
  )
`;

/* ---------------------------------------------------------
   PAGES
--------------------------------------------------------- */

export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    seo,
    content,
    contentSections,
    sections
  }
`;

export const pageWithContentBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,

    "content": ${normalizedContentExpr}[] {
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
        images[]{
          _key,
          alt,
          caption,
          asset->{
            _id,
            url,
            metadata {
              dimensions { width, height }
            }
          }
        }
      }
    }
  }
`;

/* ---------------------------------------------------------
   HOME (OPTIONAL)
--------------------------------------------------------- */

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    title,
    "slug": slug.current,

    "content": ${normalizedContentExpr}[] {
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
      }
    }
  }
`;

/* ---------------------------------------------------------
   MISSIONS (FIXED)
--------------------------------------------------------- */

export const missionsListQuery = groq`
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
    )
  }
`;

export const missionBySlugQuery = groq`
  *[_type == "mission" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    status,
    excerpt,
    startDate,
    endDate,
    location,

    "coverUrl": coalesce(
      cover.asset->url,
      fallback.asset->url,
      image.asset->url,
      gallery[0].asset->url
    ),

    metrics[] {
      metric_key,
      title,
      current_value,
      unit,
      description
    },

    // ✅ NORMALIZED GALLERY (already fixed earlier)
    "gallery": gallery[]{
      "url": asset->url,
      caption,
      alt
    },

    // ✅ THIS IS THE MISSING PART FOR SPLIT SECTIONS
    "content": ${normalizedContentExpr}[] {
      ...,

      _type == "splitSection" => {
        _type,
        _key,
        title,
        layout,
        reversed,

        left {
          kind,
          text,
          image {
            asset->{
              _id,
              url,
              metadata { dimensions }
            }
          }
        },

        right {
          kind,
          text,
          image {
            asset->{
              _id,
              url,
              metadata { dimensions }
            }
          }
        }
      }
    }
  }
`;

/* ---------------------------------------------------------
   CAMPAIGNS / INITIATIVES / EVENTS / PARTNERS
--------------------------------------------------------- */

export const campaignsListQuery = groq`
  *[_type == "campaign"] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverUrl": cover.asset->url
  }
`;

export const campaignBySlugQuery = groq`
  *[_type == "campaign" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    "coverUrl": cover.asset->url,
    gallery[]{
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`;

export const initiativesListQuery = groq`
  *[_type == "initiative"] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverUrl": cover.asset->url
  }
`;

export const initiativeBySlugQuery = groq`
  *[_type == "initiative" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    "coverUrl": cover.asset->url,
    gallery[]{
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`;

export const eventsListQuery = groq`
  *[_type == "event"] | order(date desc){
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    excerpt,
    "coverUrl": cover.asset->url
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    excerpt,
    body,
    "coverUrl": cover.asset->url,
    gallery[]{
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`;

export const partnersListQuery = groq`
  *[_type == "partner"] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    website,
    excerpt,
    "logo": logo.asset->url
  }
`;

export const partnerBySlugQuery = groq`
  *[_type == "partner" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    website,
    excerpt,
    "logo": logo.asset->url,
    body
  }
`;
