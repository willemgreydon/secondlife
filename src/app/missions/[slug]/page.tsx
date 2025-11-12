import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { missionBySlugQuery } from '@/lib/sanity.queries'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MissionDetail({ params }: { params: { slug: string } }) {
  const doc = await sanityClient.fetch(missionBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!doc) notFound()

  const content =
    doc.content?.length ? doc.content :
    doc.contentSections?.length ? doc.contentSections :
    doc.sections?.length ? doc.sections : []

  return <PageBuilder content={content} />
}
