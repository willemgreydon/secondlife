// Alle Missions, die eine slug haben
export const missionsAllQuery = `
  *[_type == "mission" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    status,
    // hier kannst du echte Felder mappen,
    // z.B. metrics -> wasteCollectedKg / volunteers
    "wasteCollectedKg": coalesce(metrics[metric_key == "tons_collected"][0].current_value * 1000, 0),
    "volunteers": coalesce(metrics[metric_key == "volunteers"][0].current_value, 0),
    // Bild-URL für Cards
    "coverUrl": coalesce(
      cover.asset->url,
      fallback.asset->url
    )
  }
`