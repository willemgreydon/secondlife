// src/app/missions/page.tsx
import { sanityClient } from '@/lib/sanity.client'
import {
  plannedMissionsQuery,
  activeMissionsQuery,
  successMissionsQuery,
} from '@/lib/sanity.queries'
import MissionCard from '@/components/missions/MissionCard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MissionsPage() {
  const [planned, active, successful] = await Promise.all([
    sanityClient.fetch(plannedMissionsQuery),
    sanityClient.fetch(activeMissionsQuery),
    sanityClient.fetch(successMissionsQuery),
  ])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {planned?.length > 0 && (
        <Section title="Planned Missions">
          {planned.map((m: any) => <MissionCard key={m._id} mission={m} />)}
        </Section>
      )}
      {active?.length > 0 && (
        <Section title="Active Missions">
          {active.map((m: any) => <MissionCard key={m._id} mission={m} />)}
        </Section>
      )}
      {successful?.length > 0 && (
        <Section title="Successful Missions">
          {successful.map((m: any) => <MissionCard key={m._id} mission={m} />)}
        </Section>
      )}
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="mb-5 text-lg font-semibold text-neutral-800 dark:text-neutral-100">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  )
}
