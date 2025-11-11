// src/components/missions/MissionCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

type Metric = { current_value?: number; unit?: string }
type Mission = {
  _id: string
  title: string
  slug: string
  status: 'planned'|'active'|'successful'|'archived'
  cover?: { asset?: { url?: string; metadata?: { lqip?: string } } }
  metrics?: { tons?: Metric; volunteers?: Metric }
}

export default function MissionCard({ mission }: { mission: Mission }) {
  const url  = mission.cover?.asset?.url
  const lqip = mission.cover?.asset?.metadata?.lqip
  const tons = mission.metrics?.tons?.current_value ?? 0
  const tonsUnit = mission.metrics?.tons?.unit ?? 't'
  const vols = mission.metrics?.volunteers?.current_value ?? 0

  return (
    <Link
      href={`/missions/${mission.slug}`}
      className={clsx(
        'group block overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md',
        'bg-white text-neutral-900 border-neutral-200',
        'dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800'
      )}
    >
      <div className="relative aspect-[16/10]">
        {url ? (
          <Image
            src={url}
            alt={mission.title}
            fill
            sizes="(min-width:1024px) 33vw, 100vw"
            className="object-cover"
            placeholder={lqip ? 'blur' : 'empty'}
            blurDataURL={lqip}
          />
        ) : (
          <div className="h-full w-full bg-neutral-100 dark:bg-neutral-800" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"/>
      </div>

      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-6">{mission.title}</h3>
          <span
            className={clsx(
              'mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
              mission.status === 'planned'     && 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
              mission.status === 'active'      && 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
              mission.status === 'successful'  && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
            )}
          >
            {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
          </span>
        </div>

        {/* Metriken: klar, ohne Emojis */}
        <div className="shrink-0 text-right">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Waste collected</div>
          <div className="text-sm font-semibold">{`${tons.toLocaleString()} ${tonsUnit}`}</div>
          <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Volunteers</div>
          <div className="text-sm font-semibold">{vols.toLocaleString()}</div>
        </div>
      </div>
    </Link>
  )
}
