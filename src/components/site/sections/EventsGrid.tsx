'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/sanity.image'

type Event = { _id:string; title:string; slug?:string; cover?:any; coverUrl?:string|null; date?:string; location?:string }
export default function EventsGrid({ title, events = [] as Event[], limit }: { title?:string; events?:Event[]; limit?:number }) {
  const list = (events || []).slice(0, Number.isFinite(limit) ? (limit as number) : events.length)
  if (!list.length) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(e => {
          const url = e.coverUrl ?? getImageUrl(e.cover)
          return (
            <li key={e._id} className="overflow-hidden rounded-2xl border bg-white">
              <Link href={`/events/${e.slug ?? e._id}`} className="block">
                <div className="relative aspect-[16/10] bg-neutral-100">{url && <Image src={url} alt={e.title} fill sizes="33vw" className="object-cover" />}</div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-lg font-medium">{e.title}</h3>
                  {(e.date || e.location) && <p className="mt-1 text-sm opacity-80">{[e.date, e.location].filter(Boolean).join(' • ')}</p>}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
