// src/app/missions/page.tsx
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { missionsListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Mission = {
  _id: string
  title: string
  slug: string
  status?: string
  cover?: string
  excerpt?: string
}

export default async function MissionsIndexPage() {
  const all: Mission[] = await sanityClient.fetch(missionsListQuery).catch(() => [])

  // Normalize status and group
  const norm = (s?: string) => (s || '').toLowerCase().trim()

  const active = all.filter((m) => norm(m.status) === 'active')
  const planned = all.filter((m) => norm(m.status) === 'planned')
  const archived = all.filter((m) =>
    ['archived', 'successful', 'completed', 'done', 'closed', 'finished'].includes(norm(m.status))
  )

  const content = [
    active.length && {
      _type: 'missionsGrid',
      _key: 'missions-active',
      title: 'Active Missions',
      missions: active,
    },
    planned.length && {
      _type: 'missionsGrid',
      _key: 'missions-planned',
      title: 'Planned Missions',
      missions: planned,
    },
    archived.length && {
      _type: 'missionsGrid',
      _key: 'missions-archived',
      title: 'Archived Missions',
      missions: archived,
    },
  ].filter(Boolean)

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
