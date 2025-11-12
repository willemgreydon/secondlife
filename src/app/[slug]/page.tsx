import PageBuilder from '@/components/site/PageBuilder'
import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { groq } from 'next-sanity'

// Generische Page-Query für beliebige Seiten mit Slug
const genericPageQuery = groq`
  *[
    _type in ["page","home"] &&
    (slug.current == $slug || _id == $slug)
  ][0]{
    _id, title, "slug": slug.current,
    // koaleszierter Content (Legacy sicher)
    "content": coalesce(content, contentSections, sections, [])
  }
`

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await sanityClient.fetch(genericPageQuery, { slug: params.slug }).catch(() => null)
  if (!page) notFound()

  return <PageBuilder content={page.content || []} />
}
