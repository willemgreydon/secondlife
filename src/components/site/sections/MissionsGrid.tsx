// src/components/site/sections/MissionsGrid.tsx
import Link from 'next/link'
import Image from 'next/image'

type MissionCard = {
  _id: string
  title: string
  slug: string
  status: 'planned' | 'active' | 'successful' | 'archived'
  coverUrl?: string
  wasteCollectedKg?: number
  volunteers?: number
}

export default function MissionsGrid({
  title,
  missions = [],
  status = 'all',
  showMetrics = true,
}: {
  title?: string
  missions?: MissionCard[]
  status?: 'all' | 'planned' | 'active' | 'successful' | 'archived'
  showMetrics?: boolean
}) {
  const filtered =
    status === 'all' ? missions : missions.filter((m) => m.status === status)

  if (!filtered.length) return null

  return (
    <section className="mx-auto max-w-6xl px-4">
      {title ? (
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">{title}</h2>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <Link
            key={m._id}
            href={`/missions/${m.slug}`}
            className="group rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
              {m.coverUrl ? (
                <Image
                  src={m.coverUrl}
                  alt={m.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="h-full w-full bg-neutral-100 dark:bg-neutral-800" />
              )}
            </div>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center justify-between">
                <h3 className="line-clamp-1 text-lg font-medium">{m.title}</h3>
                <span className="rounded-full border border-neutral-300 px-2 py-0.5 text-xs uppercase tracking-wide text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
                  {m.status}
                </span>
              </div>

              {showMetrics ? (
                <div className="mt-1 grid grid-cols-2 gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <div className="rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800/60">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">Waste collected</div>
                    <div className="font-semibold">
                      {Math.round(m.wasteCollectedKg ?? 0)} kg
                    </div>
                  </div>
                  <div className="rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800/60">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">Volunteers</div>
                    <div className="font-semibold">{m.volunteers ?? 0}</div>
                  </div>
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
