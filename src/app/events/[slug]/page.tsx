import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'
import { eventBySlugQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EventDetail({ params }: { params: { slug: string } }) {
  const doc = await sanityClient.fetch(eventBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!doc) notFound()
  // eventBySlugQuery liefert bereits Sections via ${CONTENT}
  const content =
    doc.content?.length ? doc.content :
    doc.contentSections?.length ? doc.contentSections :
    doc.sections?.length ? doc.sections : []
  return <PageBuilder content={content} />
}
