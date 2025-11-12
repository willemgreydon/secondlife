import PageBuilder from '@/components/site/PageBuilder'
import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { groq } from 'next-sanity'

const pageQuery = groq`
  *[_type == "page" && slug.current == "initiatives"][0]{
    _id, title, "content": coalesce(content, contentSections, sections, [])
  }
`

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function InitiativesIndex() {
  const page = await sanityClient.fetch(pageQuery).catch(() => null)
  if (!page) notFound()
  return <PageBuilder content={page.content || []} />
}
