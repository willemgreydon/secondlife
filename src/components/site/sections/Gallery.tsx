'use client'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity.image'
export default function Gallery({ images = [] as any[] }) {
  const list = images.map((img) => getImageUrl(img)).filter(Boolean) as string[]
  if (!list.length) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((url, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
            <Image src={url} alt="" fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}
