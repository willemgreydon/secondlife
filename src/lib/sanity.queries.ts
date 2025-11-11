import { groq } from 'next-sanity'

const CONTENT = groq`
  "content": coalesce(content, contentSections, sections, [])[]{
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
      "images": images[].asset->{
        _id, url, metadata{ lqip, dimensions }
      }
    },

    // pageBySlugOrIdQuery – Missions-Teil
    _type == "missionsGrid" => {
      _type, title, status, limit, showMetrics,
      "missions": *[_type=="mission" && (
        ^.status == "all" || !defined(^.status) || status == ^.status
      )]|order(_createdAt desc)[0...100]{   // <-- feste Zahl, kein coalesce/^.limit
        _id, title, "slug": slug.current, status,
        "coverUrl": coalesce(cover.asset->url, image.asset->url),
        wasteCollectedKg, volunteers
      }
    },

    // VIDEO
    _type == "videoSection" => {
      _type, _key, title, url, autoplay, loop
    },

    // STATS
    _type == "statsSection" => {
      _type, _key, title, stats[]{ label, value }
    },

    // TEXT
    _type == "textBlock" => {
      _type, _key, title, body
    },
    _type == "richTextSection" => {
      _type, _key, title, body
    },

    // SPLIT
    _type == "splitSection" => {
      _type, _key, title, layout,
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

    // QUOTE
    _type == "quoteSection" => {
      _type, _key, quote, author
    },

    // ACCORDION
    _type == "accordionSection" => {
      _type, _key, title, items[]{ title, content }
    },

    // EVENTS GRID  ✅ select statt JS-Ternary
    _type == "eventsGrid" => {
      _type, _key, title, onlyUpcoming,
      "events": *[
        _type == "event" &&
        select(
          coalesce(^.onlyUpcoming, true) => defined(datetime) && datetime >= now(),
          true
        )
      ] | order(coalesce(datetime, _updatedAt) asc)[0...100]{
        _id,
        title,
        excerpt,
        location,
        "slug": slug.current,
        "date": datetime,
        "cover": coalesce(cover.asset->url, image.asset->url)
      }
    },

    // CONTACT
    _type == "contactSection" => {
      _type, _key, title, email, phone, address
    },

    // TEAM (Fallback: wenn keine Auswahl, alle)
    _type == "team" => {
      _type, _key, title, layout,
      "members": select(
        defined(members) && count(members) > 0 =>
          members[]->{
            _id, name, role, linkedin, bio,
            "image": photo.asset->url
          },
        *[_type == "teamMember"] | order(name asc){
          _id, name, role, linkedin, bio,
          "image": photo.asset->url
        }
      )
    }
  }
`

export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`

export const homePageQuery = groq`
  *[_type == "page" && slug.current == "home"][0]{
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

export const pageBySlugOrIdQuery = groq`
*[_type == "page" && (slug.current == $slug || _id == $slug)][0]{
  _id,
  title,
  "slug": slug.current,

  // Legacy-Felder vereinheitlichen
  "contentSections": coalesce(contentSections, content, sections)[]{
    ...,

    // Hero: bgImage direkt als URL
    _type == "heroSection" => {
      _type, title, subtitle, ctaText, ctaHref,
      "bgImage": coalesce(bgImage.asset->url, bgImage)
    },

    // Missions Grid: feste Range, Frontend schneidet per limit
    _type == "missionsGrid" => {
      _type, title, status, limit, showMetrics,
      "missions": *[_type=="mission" && (
        ^.status == "all" || !defined(^.status) || status == ^.status
      )]|order(_createdAt desc)[0...100]{
        _id, title, "slug": slug.current, status,
        "coverUrl": coalesce(cover.asset->url, image.asset->url),
        wasteCollectedKg, volunteers
      }
    }
  }
}
`

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id, title, excerpt, location,
    "slug": slug.current,
    "date": datetime,
    cover{ asset->{ url } },
    ${CONTENT}
  }
`

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

export const eventsListQuery = groq`
  *[_type == "event" && defined(slug.current)]
  | order(coalesce(datetime, _updatedAt) desc)[0...200]{
    _id, title, excerpt, location,
    "date": datetime,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

export const missionsListQuery = groq`
  *[_type == "mission" && defined(slug.current)]
  | order(_updatedAt desc)[0...200]{
    _id, title, excerpt, status,
    "slug": slug.current,

    // Cover mit Fallback-Kette
    "cover": coalesce(cover.asset->url, fallback.asset->url, image.asset->url, gallery[0].asset->url),

    // Abgeleitete Kennzahlen für die Karten
    "wasteCollectedKg": coalesce(
      metrics[metric_key == "plastic_collected_kg"][0].current_value,
      metrics[metric_key == "tons_collected"][0].current_value * 1000,
      0
    ),
    "volunteers": coalesce(metrics[metric_key == "volunteers"][0].current_value, 0)
  }
`

export const missionsBeachCleanupsQuery = groq`
  *[
    _type == "mission" && (
      category == "beachCleanup" ||
      "beach-cleanup" in tags[] ||
      "beach-cleanups" in tags[] ||
      slug.current match "beach-cleanups"
    )
  ] | order(_updatedAt desc)[0...200]{
    _id, title, excerpt, status,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

export const eventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)]{ "slug": slug.current }[].slug
`
export const missionSlugsQuery = groq`
  *[_type == "mission" && defined(slug.current)]{ "slug": slug.current }[].slug
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

export const blogListQuery = groq`
  *[_type == "blogPost" && defined(slug.current)]
  | order(coalesce(publishedAt, _updatedAt) desc)[0...200]{
    _id, title, excerpt,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, mainImage.asset->url, image.asset->url)
  }
`

export const campaignsListQuery = groq`
  *[_type == "campaign" && defined(slug.current)]
  | order(_updatedAt desc)[0...200]{
    _id, title, excerpt, status,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

export const initiativesListQuery = groq`
  *[_type == "initiative" && defined(slug.current)]
  | order(_updatedAt desc)[0...200]{
    _id, title, excerpt, status,
    "slug": slug.current,
    "cover": coalesce(cover.asset->url, image.asset->url)
  }
`

export const partnersListQuery = groq`
  *[_type == "partner" && defined(slug.current)]
  | order(title asc)[0...200]{
    _id, title, url,
    "slug": slug.current,
    "logo": coalesce(logo.asset->url, image.asset->url)
  }
`

export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(name asc){
    _id, name, role, linkedin, bio,
    "image": photo.asset->url
  }
`
