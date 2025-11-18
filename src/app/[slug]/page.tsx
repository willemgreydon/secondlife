import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugOrFixedIdQuery } from '@/lib/sanity.queries'
import PageBuilder from '@/components/site/PageBuilder'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const page = await sanityClient
    .fetch(pageBySlugOrFixedIdQuery, { slug })
    .catch(() => null)

  if (!page) notFound()

  return <PageBuilder content={page.content || []} />
}
