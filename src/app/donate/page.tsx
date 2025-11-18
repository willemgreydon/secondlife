import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugOrFixedIdQuery } from '@/lib/sanity.queries'
import PageBuilder from '@/components/site/PageBuilder'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DonatePage() {
  // If “donate” is a normal Page doc with slug "donate"
  const page = await sanityClient
    .fetch(pageBySlugOrFixedIdQuery, { slug: 'donate' })
    .catch(() => null)

  if (!page) notFound()
  return <PageBuilder content={page.content || []} />
}
