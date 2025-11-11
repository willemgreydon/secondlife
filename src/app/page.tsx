// src/app/page.tsx
import PageBuilder from '@/components/site/PageBuilder'
import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugOrIdQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const page = await sanityClient.fetch(pageBySlugOrIdQuery, { slug: 'home' }).catch(() => null)
  if (!page) notFound()

  // Priorität: contentSections → content → sections
  const content =
    (Array.isArray(page.contentSections) && page.contentSections.length && page.contentSections) ||
    (Array.isArray(page.content) && page.content.length && page.content) ||
    (Array.isArray(page.sections) && page.sections.length && page.sections) ||
    []

  // Nichts weiter anfassen: PageBuilder will 'content' und macht den Rest
  return <PageBuilder content={content} />
}
