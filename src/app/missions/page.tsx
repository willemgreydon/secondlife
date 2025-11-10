import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { missionsListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MissionsIndexPage() {
  const missions = await sanityClient.fetch(missionsListQuery).catch(() => [])

  const content = [
    {
      _type: 'missionsGrid',      // Matches your MissionsGrid.tsx
      _key: 'missions-index',
      title: 'Missions',
      missions,                   // expected by MissionsGrid
      items: missions,            // safety alias (ignored if not used)
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
