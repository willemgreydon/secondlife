// src/lib/sanity.queries.ts
import {groq} from 'next-sanity'

/**
 * Einheitliche CONTENT-Projektion für den PageBuilder.
 * - coalesced alte/aktuelle Felder (content, contentSections, sections)
 * - normalisierte Props pro Section-Typ
 */
const CONTENT = groq`
  "content": coalesce(content, contentSections, sections, [])[] {
    ...,

    // HERO
    _type == "heroSection" => {
      _type, _key, title, subtitle, ctaHref,
      "ctaText": coalesce(ctaText, ctaLabel),
      "bgImage": bgImage.asset->url
    },

    // IMAGE BLOCK
    _type == "imageBlock" => {
      _type, _key, caption,
      "imageUrl": image.asset->url,
      "alt": coalesce(alt, caption)
    },

    // GALLERY
    _type == "gallerySection" => {
      _type, _key, title,
      "images": images[].asset->{ _id, url, metadata{ lqip, dimensions } }
    },

    // MISSIONS GRID
    _type == "missionsGrid" => {
      _type, _key, title, status, limit, showMetrics,
      "missions": *[
        _type == "mission" && (
          !defined(^.status) ||
          status == ^.status ||
          ^.status == "all"
        )
      ] | order(_createdAt desc)[0...coalesce(^.limit, 100)]{
        _id,
        title,
        "slug": slug.current,
        status,
        "coverUrl": coalesce(cover.asset->url, fallback.asset->url, image.asset->url, gallery[0].asset->url),
        "wasteCollectedKg": coalesce(
          metrics[metric_key == "plastic_collected_kg"][0].current_value,
          metrics[metric_key == "tons_collected"][0].current_value * 1000,
          0
        ),
        "volunteers": coalesce(metrics[metric_key == "volunteers"][0].current_value, 0)
      }
    },

    // VIDEO
    _type == "videoSection" => { _type, _key, title, url, autoplay, loop },

    // STATS
    _type == "statsSection" => { _type, _key, title, stats[]{ label, value } },

    // TEXT / RICHTEXT
    _type == "textBlock" => { _type, _key, title, body },
    _type == "richTextSection" => { _type, _key, title, body },

    // SPLIT (legacy-kompatibel)
    _type == "splitSection" => {
      _type, _key, title, layout,
      "left": {
        "kind": coalesce(
          left.kind,
          select(defined(text) && !defined(image) => "text", defined(image) => "image", "text")
        ),
        "text": coalesce(left.text, text),
        "imageUrl": coalesce(left.image.asset->url, image.asset->url),
        "alt": coalesce(left.alt, alt)
      },
      "right": {
        "kind": coalesce(
          right.kind,
          select(defined(image) && reversed == true => "image", defined(text) && reversed != true => "text", defined(image) => "image", "image")
        ),
        "text": right.text,
        "imageUrl": right.image.asset->url,
        "alt": right.alt
      },
      "reversed": coalesce(reversed, reverse, false)
    },

    // QUOTE
    _type == "quoteSection" => { _type, _key, quote, author },

    // ACCORDION
    _type == "accordionSection" => { _type, _key, title, items[]{ title, content } },

    // EVENTS GRID
    _type == "eventsGrid" => {
      _type, _key, title, onlyUpcoming,
      "events": *[
        _type == "event" &&
        select(coalesce(^.onlyUpcoming, true) => defined(datetime) && datetime >= now(), true)
      ] | order(coalesce(datetime, _updatedAt) asc)[0...100]{
        _id, title, excerpt, location,
        "slug": slug.current,
        "date": datetime,
        "cover": coalesce(cover.asset->url, image.asset->url)
      }
    },

    // CONTACT
    _type == "contactSection" => { _type, _key, title, email, phone, address },

    // TEAM (Fallback: alle Members, wenn keine Auswahl)
    _type == "team" => {
      _type, _key, title, layout,
      "members": select(
        defined(members) && count(members) > 0 =>
          members[]->{ _id, name, role, linkedin, bio, "image": photo.asset->url },
        *[_type == "teamMember"] | order(name asc){ _id, name, role, linkedin, bio, "image": photo.asset->url }
      )
    },

    // PARTNERS GRID
    _type == "partnersSection" => {
      _type, _key, title, limit,
      "partners": *[_type == "partner"] | order(title asc)[0...coalesce(^.limit, 200)]{
        _id, title, url,
        "slug": slug.current,
        "logo": coalesce(logo.asset->url, image.asset->url)
      }
    },

    // IMPACT STATS
    _type == "impactStatsSection" => {
      _type, _key, title,
      metrics[]{ metric_key, title, current_value, unit, as_of_date, description }
    }
  }
`

/* ------------------------------ HOME ------------------------------ */
export const homeDocQuery = groq`
  *[_type in ["page","home"] && slug.current == "home"][0]{
    _id, title, "slug": slug.current, ${CONTENT}
  }
`

export const homeQuery = groq`
  *[_type in ["page","home"] && slug.current == "home"][0]{
    _id, title, "slug": slug.current, content, contentSections, sections
  }
`

/* ------------------------------ GENERISCHE PAGES ------------------------------ */

/** Nur Slugs auflisten, die wirklich gesetzt sind */
export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`

/**
 * Laden per Slug ODER (nur) für echte Singletons per fixer ID.
 * WICHTIG: 'missions' ist KEIN Singleton und taucht hier NICHT auf!
 * Slug-Treffer werden explizit priorisiert.
 */
export const pageBySlugOrFixedIdQuery = groq`
  *[
    _type == "page" && (
      slug.current == $slug ||
      (
        _id in ["home","tide","operations","join-us","contact","organisation"] &&
        $slug in ["home","tide","operations","join-us","contact","organisation"]
      )
    )
  ]
  | order(slug.current == $slug desc, defined(slug.current) desc, _updatedAt desc)[0]{
    _id, title, "slug": slug.current, ${CONTENT}
  }
`

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, ${CONTENT}
  }
`

export const pageByIdQuery = groq`
  *[_type == "page" && _id == $id][0]{
    _id, title, "slug": slug.current, ${CONTENT}
  }
`

/* ------------------------------ EVENTS ------------------------------ */

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id, title, excerpt, location,
    "slug": slug.current,
    "date": datetime,
    cover{ asset->{ url } },
    ${CONTENT}
  }
`

export const eventsListQuery = groq`
  *[_type == "event" && defined(slug.current)]
  | order(coalesce(datetime, _updatedAt) desc)[0...200]{
    _id, title, excerpt, location,
    "date": datetime,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

export const eventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)]{ "slug": slug.current }[].slug
`

/* ------------------------------ MISSIONS ------------------------------ */

export const missionBySlugQuery = groq`
  *[_type == "mission" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, status, excerpt,
    cover{ asset->{ url } }, fallback{ asset->{ url } },
    ${CONTENT},
    metrics[]{ metric_key, title, current_value, unit, as_of_date, description },
    "gallery": gallery[]{
      "url": asset->url,
      asset->{ _id, url, metadata{ lqip, dimensions } },
      alt, caption
    }
  }
`

export const missionsListQuery = groq`
  *[_type == "mission" && defined(slug.current)]
  | order(_updatedAt desc)[0...200]{
    _id, title, excerpt, status,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, fallback.asset->url, image.asset->url, gallery[0].asset->url),
    "wasteCollectedKg": coalesce(
      metrics[metric_key == "plastic_collected_kg"][0].current_value,
      metrics[metric_key == "tons_collected"][0].current_value * 1000,
      0
    ),
    "volunteers": coalesce(metrics[metric_key == "volunteers"][0].current_value, 0)
  }
`

export const missionSlugsQuery = groq`
  *[_type == "mission" && defined(slug.current)]{ "slug": slug.current }[].slug
`

export const plannedMissionsQuery = groq`
  *[_type == "mission" && status == "planned"] | order(_createdAt desc){
    _id, title, "slug": slug.current, status,
    "cover": coalesce(cover.asset->url, fallback.asset->url, image.asset->url),
    "metrics": {
      "tons": metrics[metric_key == "tons_collected"][0]{ current_value, unit },
      "volunteers": metrics[metric_key == "volunteers"][0]{ current_value, unit }
    }
  }
`

export const activeMissionsQuery = groq`
  *[_type == "mission" && status == "active"] | order(_createdAt desc){
    _id, title, "slug": slug.current, status,
    "cover": coalesce(cover.asset->url, fallback.asset->url, image.asset->url),
    "metrics": {
      "tons": metrics[metric_key == "tons_collected"][0]{ current_value, unit },
      "volunteers": metrics[metric_key == "volunteers"][0]{ current_value, unit }
    }
  }
`

export const successMissionsQuery = groq`
  *[_type == "mission" && status == "successful"] | order(_createdAt desc){
    _id, title, "slug": slug.current, status,
    "cover": coalesce(cover.asset->url, fallback.asset->url, image.asset->url),
    "metrics": {
      "tons": metrics[metric_key == "tons_collected"][0]{ current_value, unit },
      "volunteers": metrics[metric_key == "volunteers"][0]{ current_value, unit }
    }
  }
`

/* ------------------------------ BLOG / CAMPAIGNS / INITIATIVES / PARTNERS ------------------------------ */

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }[].slug
`

export const blogListQuery = groq`
  *[_type == "blogPost" && defined(slug.current)]
  | order(coalesce(publishedAt, _updatedAt) desc)[0...200]{
    _id, title, excerpt,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, mainImage.asset->url, image.asset->url)
  }
`

export const campaignSlugsQuery = groq`
  *[_type == "campaign" && defined(slug.current)]{ "slug": slug.current }[].slug
`

export const campaignsListQuery = groq`
  *[_type == "campaign" && defined(slug.current)]
  | order(_updatedAt desc)[0...200]{
    _id, title, excerpt, status,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

export const initiativeSlugsQuery = groq`
  *[_type == "initiative" && defined(slug.current)]{ "slug": slug.current }[].slug
`

export const initiativesListQuery = groq`
  *[_type == "initiative" && defined(slug.current)]
  | order(_updatedAt desc)[0...200]{
    _id, title, excerpt, status,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

export const partnerSlugsQuery = groq`
  *[_type == "partner" && defined(slug.current)]{ "slug": slug.current }[].slug
`

export const partnersListQuery = groq`
  *[_type == "partner" && defined(slug.current)]
  | order(title asc)[0...200]{
    _id, title, url,
    "slug": slug.current,
    "logo": coalesce(logo.asset->url, image.asset->url)
  }
`

/* ------------------------------ TEAM ------------------------------ */

export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(name asc){
    _id, name, role, linkedin, bio,
    "image": photo.asset->url
  }
`

/* ------------------------------ CONTENT BY SLUG ------------------------------ */

export const pageWithContentBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, ${CONTENT}
  }
`
