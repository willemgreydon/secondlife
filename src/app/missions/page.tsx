// src/app/missions/page.tsx
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugOrIdQuery, missionsListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MissionsIndexPage() {
  const page = await sanityClient
    .fetch(pageBySlugOrIdQuery, { slug: 'missions' })
    .catch(() => null)

  if (page) {
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

  const missions = await sanityClient.fetch(missionsListQuery).catch(() => [])
  const content = [
    {
      _type: 'hero',
      _key: 'auto-hero',
      title: 'Missions',
      subtitle: 'Latest updates from our field work',
    },
    {
      _type: 'missionsGrid',
      _key: 'auto-grid',
      title: 'All missions',
      missions,
    },
  ]
  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
