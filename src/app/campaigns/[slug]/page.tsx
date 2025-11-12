import PageBuilder from '@/components/site/PageBuilder'
import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { groq } from 'next-sanity'

const campaignQuery = groq`
  *[_type == "campaign" && slug.current == $slug][0]{
    _id, title, "content": coalesce(content, contentSections, sections, [])
  }
`

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Campaign({ params }: { params: { slug: string } }) {
  const doc = await sanityClient.fetch(campaignQuery, { slug: params.slug }).catch(() => null)
  if (!doc) notFound()
  return <PageBuilder content={doc.content || []} />
}
