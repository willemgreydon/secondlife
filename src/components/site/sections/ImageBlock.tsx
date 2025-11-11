'use client'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity.image'
export default function ImageBlock({ image, alt }: { image?:any; alt?:string }) {
  const url = getImageUrl(image)
  if (!url) return null
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
        <Image src={url} alt={alt || ''} fill sizes="100vw" className="object-cover" />
      </div>
    </section>
  )
}
