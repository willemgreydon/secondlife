'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function MissionCard({
  mission,
  showMetrics = true,
}: {
  mission: any
  showMetrics?: boolean
}) {
  const href = `/missions/${mission.slug}`
  const cover = mission.cover || mission.coverUrl

  return (
    <article className="group overflow-hidden rounded-2xl border">
      {cover && (
        <div className="relative aspect-[16/10] bg-neutral-100">
          <Image src={cover} alt="" fill sizes="33vw" className="object-cover transition-transform group-hover:scale-[1.02]" />
        </div>
      )}

      <div className="p-4">
        <Link href={href} className="text-lg font-semibold hover:underline">
          {mission.title}
        </Link>
        {mission.status && (
          <span className="ml-2 rounded-full border px-2 py-0.5 text-xs opacity-70">{mission.status}</span>
        )}

        {showMetrics && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg bg-neutral-100 p-2 text-center dark:bg-neutral-900">
              <div className="font-semibold">{Math.round(mission.wasteCollectedKg || 0)}</div>
              <div className="opacity-70">kg collected</div>
            </div>
            <div className="rounded-lg bg-neutral-100 p-2 text-center dark:bg-neutral-900">
              <div className="font-semibold">{Math.round(mission.volunteers || 0)}</div>
              <div className="opacity-70">volunteers</div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
