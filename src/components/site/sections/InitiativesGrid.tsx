'use client'
import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity.image'
type Initiative = { _id:string; title:string; slug?:string; cover?:any; coverUrl?:string|null; summary?:string }
export default function InitiativesGrid({ title, initiatives=[] as Initiative[] }) {
  if (!initiatives.length) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {initiatives.map(it => {
          const url = it.coverUrl ?? getImageUrl(it.cover)
          return (
            <li key={it._id} className="overflow-hidden rounded-2xl border bg-white">
              <Link href={`/initiatives/${it.slug ?? it._id}`} className="block">
                <div className="relative aspect-[16/10] bg-neutral-100">{url && <Image src={url} alt={it.title} fill sizes="33vw" className="object-cover" />}</div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-lg font-medium">{it.title}</h3>
                  {it.summary && <p className="mt-1 line-clamp-2 text-sm opacity-80">{it.summary}</p>}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
