import PageBuilder from '@/components/site/PageBuilder'
import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugOrFixedIdQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MissionsIndex() {
  const page = await sanityClient
    .fetch(pageBySlugOrFixedIdQuery, { slug: 'missions' })
    .catch(() => null)

  if (!page) notFound()
  return <PageBuilder content={page.content || []} />
}
