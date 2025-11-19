import { groq } from "next-sanity";
import { getServerClient } from "@/lib/sanity.preview";

export async function getEvent(slug: string) {
  const client = await getServerClient();

  return client.fetch(
    groq`*[_type == "event" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      date,
      location,
      "content": coalesce(content, contentSections, sections, [])
    }`,
    { slug }
  );
}

export async function getAllEventSlugs() {
  const client = await getServerClient();
  return client.fetch(groq`*[_type == "event" && defined(slug.current)][].slug.current`);
}
