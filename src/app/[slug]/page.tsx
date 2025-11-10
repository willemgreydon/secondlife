// src/app/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

export default async function Page({
  params,
}: {
  // WICHTIG: params ist ein Promise in Next 16
  params: Promise<SlugParams>
}) {
  const { slug } = await params

  const page = await sanityClient
    .fetch(pageBySlugQuery, { slug })
    .catch(() => null)

  if (!page) notFound()

  const content =
    page.content?.length
      ? page.content
      : page.contentSections?.length
      ? page.contentSections
      : page.sections?.length
      ? page.sections
      : []

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}