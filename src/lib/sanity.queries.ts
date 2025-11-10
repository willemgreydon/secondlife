// src/lib/sanity.queries.ts
import { groq } from 'next-sanity'
import { sanityClient } from './sanity.client'

/**
 * Normalisierte Projektion:
 * - nimmt content/contentSections/sections → einheitlich "content"[]
 * - wandelt gängige Section-Typen in flache Felder um
 */
const CONTENT = groq`
  "content": (
    select(
      defined(content) => content,
      defined(contentSections) => contentSections,
      defined(sections) => sections,
      []
    )
  )[]{
    ...,

    _type == "heroSection" => {
      _type, _key, title, subtitle, ctaHref,
      "ctaText": coalesce(ctaText, ctaLabel),
      "bgImage": bgImage.asset->url
    },

    _type == "imageBlock" => {
      _type, _key, caption,
      "imageUrl": image.asset->url,
      "alt": coalesce(alt, caption)
    },

    _type == "gallerySection" => {
      _type, _key, title,
      "images": images[].asset->{
        _id, url, metadata{lqip, dimensions}
      }
    },

    _type == "missionsGrid" => {
      _type, _key, title,
      // case-insensitive status matching; if onlyStatus is not set, return all
      "missions": *[
        _type == "mission" &&
        (
          !defined(^.onlyStatus) ||
          lower(status) == lower(^.onlyStatus)
        )
      ] | order(_updatedAt desc)[0...100]{
        _id, title, excerpt, status,
        "slug": slug.current,
        "cover": coalesce(cover.asset->url, image.asset->url)
      }
    },

    _type == "videoSection" => {
      _type, _key, title, url, autoplay, loop
    },

    _type == "statsSection" => {
      _type, _key, title, stats[]{ label, value }
    },

    _type == "textBlock" => {
      _type, _key, title, body
    },

    _type == "richTextSection" => {
      _type, _key, title, body
    },

    _type == "splitSection" => {
      _type, _key, title,
      // carry through layout if present
      layout,

      // LEFT side (supports new model, falls back to legacy fields)
      "left": {
        "kind": coalesce(left.kind,
          select(defined(text) && !defined(image) => "text",
                 defined(image)               => "image",
                 "text")
        ),
        "text": coalesce(left.text, text),
        "imageUrl": coalesce(left.image.asset->url, image.asset->url),
        "alt": coalesce(left.alt, alt)
      },

      // RIGHT side (supports new model, falls back to legacy + reversed)
      "right": {
        "kind": coalesce(right.kind,
          select(defined(image) && reversed == true  => "image",
                 defined(text)   && reversed != true => "text",
                 defined(image)                      => "image",
                 "image")
        ),
        "text": right.text,
        "imageUrl": right.image.asset->url,
        "alt": right.alt
      }
    },

    _type == "quoteSection" => {
      _type, _key, quote, author
    },

    _type == "accordionSection" => {
      _type, _key, title, items[]{ title, content }
    },

    _type == "contactSection" => {
      _type, _key, title, email, phone, address
    },

    _type == "team" => {
      _type, _key, title, layout,
      "members": select(
        defined(members) && count(members) > 0 =>
          members[]->{
            _id, name, role, linkedin, bio,
            "image": photo.asset->url
          },
        // Fallback: alle TeamMember-Dokumente, wenn keine Auswahl getroffen
        *[_type == "teamMember"] | order(name asc){
          _id, name, role, linkedin, bio,
          "image": photo.asset->url
        }
      )
    }
  }
`

// Alle Page-Slugs (für SSG/Routing)
export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`

// HOME via slug "home"
export const homePageQuery = groq`
  *[_type == "page" && slug.current == "home"][0]{
    _id,
    title,
    "slug": slug.current,
    ${CONTENT}
  }
`

// Page per slug
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    ${CONTENT}
  }
`

// Page per id (Fallback)
export const pageByIdQuery = groq`
  *[_type == "page" && _id == $id][0]{
    _id,
    title,
    "slug": slug.current,
    ${CONTENT}
  }
`

// Page per slug ODER _id (für Singletons ohne slug)
export const pageBySlugOrIdQuery = groq`
  *[_type == "page" && (slug.current == $slug || _id == $slug)][0]{
    _id,
    title,
    "slug": slug.current,
    ${CONTENT}
  }
`

// ——— Detail-Dokumente pro Typ

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id, title, "slug": slug.current,
    ${CONTENT}
  }
`
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id, title, "slug": slug.current,
    ${CONTENT}
  }
`
export const campaignBySlugQuery = groq`
  *[_type == "campaign" && slug.current == $slug][0]{
    _id, title, "slug": slug.current,
    ${CONTENT}
  }
`
export const initiativeBySlugQuery = groq`
  *[_type == "initiative" && slug.current == $slug][0]{
    _id, title, "slug": slug.current,
    ${CONTENT}
  }
`
export const partnerBySlugQuery = groq`
  *[_type == "partner" && slug.current == $slug][0]{
    _id, title, "slug": slug.current,
    ${CONTENT}
  }
`

// ——— Nur die Slugs (für generateStaticParams)
export const missionSlugsQuery = groq`
  *[_type == "mission" && defined(slug.current)]{ "slug": slug.current }[].slug
`
export const eventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)]{ "slug": slug.current }[].slug
`
export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }[].slug
`
export const campaignSlugsQuery = groq`
  *[_type == "campaign" && defined(slug.current)]{ "slug": slug.current }[].slug
`
export const initiativeSlugsQuery = groq`
  *[_type == "initiative" && defined(slug.current)]{ "slug": slug.current }[].slug
`
export const partnerSlugsQuery = groq`
  *[_type == "partner" && defined(slug.current)]{ "slug": slug.current }[].slug
`

// Missionen
export const missionsListQuery = groq`
  *[_type == "mission" && defined(slug.current)]
  | order(_updatedAt desc)[0...200]{
    _id,
    title,
    excerpt,
    status,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

// Kampagnen
export const campaignsListQuery = groq`
  *[_type == "campaign" && defined(slug.current)]
  | order(_updatedAt desc)[0...200]{
    _id,
    title,
    excerpt,
    status,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

// Initiativen
export const initiativesListQuery = groq`
  *[_type == "initiative" && defined(slug.current)]
  | order(_updatedAt desc)[0...200]{
    _id,
    title,
    excerpt,
    status,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

// Partner
export const partnersListQuery = groq`
  *[_type == "partner" && defined(slug.current)]
  | order(title asc)[0...200]{
    _id,
    title,
    url,
    "slug": slug.current,
    "logo": coalesce(logo.asset->url, image.asset->url)
  }
`

// Events
export const eventsListQuery = groq`
  *[_type == "event" && defined(slug.current)]
  | order(coalesce(date, _updatedAt) desc)[0...200]{
    _id,
    title,
    date,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

// Blog
export const blogListQuery = groq`
  *[_type == "blogPost" && defined(slug.current)]
  | order(coalesce(publishedAt, _updatedAt) desc)[0...200]{
    _id,
    title,
    excerpt,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, mainImage.asset->url, image.asset->url)
  }
`

export const missionBySlugQuery = groq`
  *[_type == "mission" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, status, excerpt,
    cover{ asset->{ url } }, fallback{ asset->{ url } },

    ${CONTENT}, // normalisierte Sections

    metrics[]{ metric_key, title, current_value, unit, as_of_date, description },
    "gallery": gallery[]{
      "url": asset->url,
      asset->{ _id, url, metadata{ lqip, dimensions } },
      alt, caption
    }
  }
`
