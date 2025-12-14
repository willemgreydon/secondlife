// ---------------------------------------------------------
// sanity.queries.ts — STABLE, NON-EMPTY CONTENT + TYPE-ALIAS VERSION
// ---------------------------------------------------------
import { groq } from "next-sanity";

/**
 * Helper logic:
 * We must NOT use plain coalesce(content, contentSections, sections, [])
 * because empty arrays are "defined" in GROQ and will win the coalesce.
 *
 * So we pick the first NON-EMPTY array.
 */
const normalizedContentExpr = `
  select(
    defined(contentSections) && count(contentSections) > 0 => contentSections,
    defined(content) && count(content) > 0 => content,
    defined(sections) && count(sections) > 0 => sections,
    []
  )
`;

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

/**
 * ---------------------------------------------------------
 * PAGE WITH NORMALIZED CONTENT
 * ---------------------------------------------------------
 */
 export const pageWithContentBySlugQuery = groq`
   *[_type == "page" && slug.current == $slug][0]{
     _id,
     title,
     "slug": slug.current,

     // ✅ SINGLE SOURCE OF TRUTH
     "content": coalesce(contentSections, content, sections, [])[]{
       ...,

       // -----------------------------
       // HERO
       // -----------------------------
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

       // -----------------------------
       // GALLERY (THIS WAS MISSING)
       // -----------------------------
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
               dimensions {
                 width,
                 height
               }
             }
           }
         }
       }
     }
   }
 `;


/**
 * ---------------------------------------------------------
 * (Optional) HOME QUERY
 * You said: Home should be a normal page.
 * If you switch / to getPageBySlug("home"), you can delete this later.
 * ---------------------------------------------------------
 */
export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    title,
    "slug": slug.current,
    "content": ${normalizedContentExpr}[]{
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

/**
 * ---------------------------------------------------------
 * LIST / DETAIL QUERIES (unchanged)
 * ---------------------------------------------------------
 */
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
    body,
    startDate,
    endDate,
    location,
    "coverUrl": coalesce(
      cover.asset->url,
      fallback.asset->url,
      image.asset->url,
      gallery[0].asset->url
    ),
    metrics[]{
      metric_key,
      current_value,
      label
    },
    gallery[]{
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`;

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
