// src/app/page.tsx
import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { homePageQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const page = await sanityClient.fetch(homePageQuery).catch(() => null)
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