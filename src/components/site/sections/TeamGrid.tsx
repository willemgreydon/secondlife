'use client'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity.image'
type Member = { _id:string; name:string; role?:string; photo?:any; photoUrl?:string|null }
export default function TeamGrid({ title, members = [] as Member[] }) {
  const list = members.map(m => ({ ...m, img: m.photoUrl ?? getImageUrl(m.photo) }))
  if (!list.length) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => (
          <li key={p._id} className="rounded-2xl border bg-white p-4 text-center">
            {p.img && <div className="mx-auto mb-3 h-32 w-32 overflow-hidden rounded-full bg-neutral-100 relative"><Image src={p.img} alt={p.name} fill sizes="128px" className="object-cover" /></div>}
            <div className="font-medium">{p.name}</div>
            {p.role && <div className="text-sm opacity-70">{p.role}</div>}
          </li>
        ))}
      </ul>
    </section>
  )
}
