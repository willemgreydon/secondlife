'use client'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity.image'
type Partner = { _id:string; name?:string; logo?:any; logoUrl?:string|null; url?:string }
export default function Partners({ title, partners=[] as Partner[] }) {
  const list = partners
    .map(p => ({ ...p, img: p.logoUrl ?? getImageUrl(p.logo) }))
    .filter(p => !!p.img)
  if (!list.length) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {list.map(p => (
          <li key={p._id} className="flex items-center justify-center rounded-xl border bg-white p-4">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noreferrer">
                <Image src={p.img!} alt={p.name || ''} width={180} height={64} className="object-contain" />
              </a>
            ) : (
              <Image src={p.img!} alt={p.name || ''} width={180} height={64} className="object-contain" />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
