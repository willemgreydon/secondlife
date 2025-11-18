import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { missionBySlugQuery } from '@/lib/sanity.queries'
import PageBuilder from '@/components/site/PageBuilder'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MissionDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Next 16: params is a Promise
  const { slug } = await params

  const doc = await sanityClient
    .fetch(missionBySlugQuery, { slug })
    .catch(() => null)

  if (!doc) notFound()

  const content =
    (Array.isArray(doc.content) && doc.content) ||
    (Array.isArray(doc.contentSections) && doc.contentSections) ||
    (Array.isArray(doc.sections) && doc.sections) ||
    []

  return <PageBuilder content={content} context={{ metrics: doc.metrics }} />
}
