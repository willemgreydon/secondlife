// ---------------------------------------------------------
// sanity.queries.ts — FINAL MASTER VERSION
// ---------------------------------------------------------
import { groq } from "next-sanity";

/**
 * ---------------------------------------------------------
 *  BASIC PAGE QUERIES
 * ---------------------------------------------------------
 */

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
    // Fallback für Content-Felder aus alten Schemas
    content,
    contentSections,
    sections
  }
`;

/**
 * Normalisierte Page Query mit dynamischem Content-Mapping
 * (Hero, ImageBlock, Gallery, MissionsGrid, InitiativesGrid, CampaignsGrid, EventsGrid, PartnerGrid)
 */

export const pageWithContentBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,

    "content": coalesce(content, contentSections, sections, [])[]{
      ...,

      /* ------------------------------ HERO ------------------------------ */
      _type == "heroSection" => {
        _type, _key, title, subtitle,
        ctaHref,
        "ctaText": coalesce(ctaText, ctaLabel),
        "bgImage": bgImage.asset->url
      },

      /* --------------------------- IMAGE BLOCK --------------------------- */
      _type == "imageBlock" => {
        _type, _key, caption,
        "imageUrl": image.asset->url,
        "alt": coalesce(alt, caption)
      },

      /* ----------------------------- GALLERY ----------------------------- */
      _type == "gallerySection" => {
        _type, _key, title,
        "images": images[].asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        }
      },

      /* --------------------------- MISSIONS GRID ------------------------- */
      _type == "missionsGrid" => {
        _type, _key, title, status, limit,
        "missions": *[_type == "mission" && (
          !defined(^.status) ||
          status == ^.status ||
          ^.status == "all"
        )] | order(_createdAt desc)[0...coalesce(^.limit, 100)]{
          _id,
          title,
          "slug": slug.current,
          excerpt,
          status,
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
      },

      /* -------------------------- INITIATIVES GRID ------------------------ */
      _type == "initiativesGrid" => {
        _type, _key, title, limit,
        "initiatives": *[_type == "initiative"] 
          | order(_createdAt desc)[0...coalesce(^.limit, 100)]{
            _id, title,
            "slug": slug.current,
            excerpt,
            "coverUrl": coalesce(
              cover.asset->url,
              gallery[0].asset->url
            )
          }
      },

      /* ---------------------------- CAMPAIGNS GRID ------------------------ */
      _type == "campaignsGrid" => {
        _type, _key, title, limit,
        "campaigns": *[_type == "campaign"]
          | order(_createdAt desc)[0...coalesce(^.limit, 100)]{
            _id, title,
            "slug": slug.current,
            excerpt,
            "coverUrl": coalesce(
              cover.asset->url,
              gallery[0].asset->url
            )
          }
      },

      /* ------------------------------ EVENTS GRID ------------------------- */
      _type == "eventsGrid" => {
        _type, _key, title, limit,
        "events": *[_type == "event"]
          | order(date desc)[0...coalesce(^.limit, 100)]{
            _id, title,
            "slug": slug.current,
            date,
            location,
            excerpt,
            "coverUrl": coalesce(
              cover.asset->url,
              gallery[0].asset->url
            )
          }
      },

      /* ----------------------------- PARTNERS GRID ------------------------ */
      _type == "partnerGrid" => {
        _type, _key, title, limit,
        "partners": *[_type == "partner"]
          | order(_createdAt desc)[0...coalesce(^.limit, 100)]{
            _id, title,
            "slug": slug.current,
            website,
            excerpt,
            "logo": logo.asset->url
          }
      }
    }
  }
`;


/**
 * ---------------------------------------------------------
 *  MISSIONS
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

/**
 * ---------------------------------------------------------
 *  CAMPAIGNS
 * ---------------------------------------------------------
 */

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
    gallery[].asset->{
      _id, url, metadata{ lqip, dimensions }
    }
  }
`;

/**
 * ---------------------------------------------------------
 *  INITIATIVES
 * ---------------------------------------------------------
 */

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
    gallery[].asset->{
      _id, url, metadata{ lqip, dimensions }
    }
  }
`;

/**
 * ---------------------------------------------------------
 *  EVENTS
 * ---------------------------------------------------------
 */

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
    gallery[].asset->{
      _id, url, metadata{ lqip, dimensions }
    }
  }
`;

/**
 * ---------------------------------------------------------
 *  PARTNERS
 * ---------------------------------------------------------
 */

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

/**
 * ---------------------------------------------------------
 *  BLOG POSTS
 * ---------------------------------------------------------
 */

export const blogPostsListQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "coverUrl": cover.asset->url
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    publishedAt,
    "coverUrl": cover.asset->url,
    author->{ name }
  }
`;

/**
 * ---------------------------------------------------------
 *  HOME PAGE
 * ---------------------------------------------------------
 */

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    title,
    "slug": slug.current,
    content,
    hero,
    featuredMissions[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "coverUrl": cover.asset->url
    }
  }
`;
