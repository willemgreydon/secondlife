'use client'
import Image from 'next/image'

export default function Gallery({ images = [], title }: { images?: any[]; title?: string }) {
  if (!Array.isArray(images) || images.length === 0) return null
  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img: any, i: number) => {
          const url = img?.url || img?.asset?.url
          if (!url) return null
          return (
            <div key={img._id || i} className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
              <Image src={url} alt="" fill sizes="33vw" className="object-cover" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
