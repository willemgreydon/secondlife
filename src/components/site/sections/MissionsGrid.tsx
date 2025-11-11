'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/sanity.image'
type Mission = { _id:string; title:string; slug?:string; status?:string; coverUrl?:string|null; image?:any; wasteCollectedKg?:number; volunteers?:number }
export default function MissionsGrid({ title, missions=[], showMetrics=true, limit }: { title?:string; missions:Mission[]; showMetrics?:boolean; limit?:number }) {
  const max = Number.isFinite(limit) ? (limit as number) : 100
  const list = missions.slice(0, max)
  if (!list.length) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(m => {
          const url = m.coverUrl ?? getImageUrl(m.image)
          return (
            <li key={m._id} className="group overflow-hidden rounded-2xl border bg-white shadow-sm">
              <Link href={`/missions/${m.slug ?? m._id}`} className="block">
                <div className="relative aspect-[16/10] bg-neutral-100">{url && <Image src={url} alt={m.title} fill sizes="33vw" className="object-cover" />}</div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="line-clamp-2 text-lg font-medium">{m.title}</h3>
                    {m.status && <span className="ml-3 rounded-full border px-2.5 py-0.5 text-xs capitalize">{m.status}</span>}
                  </div>
                  {showMetrics && (
                    <div className="mt-3 flex gap-3 text-sm">
                      <span className="rounded-md bg-neutral-100 px-2 py-1">♻️ {Math.max(0, m.wasteCollectedKg ?? 0).toLocaleString()} kg</span>
                      <span className="rounded-md bg-neutral-100 px-2 py-1">👥 {Math.max(0, m.volunteers ?? 0).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
