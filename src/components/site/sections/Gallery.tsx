'use client'

import Image from 'next/image'

export default function Gallery({ title, images }: { title?: string; images?: any[] }) {
  if (!images?.length) return null
  return (
    <section className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {title && <h2 className="mb-8 text-3xl font-semibold">{title}</h2>}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img._id} className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={img.url} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}