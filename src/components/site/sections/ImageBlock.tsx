'use client'

import Image from 'next/image'

export default function ImageBlock({ imageUrl, caption }: { imageUrl?: string; caption?: string }) {
  if (!imageUrl) return null
  return (
    <figure className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <div className="relative mx-auto h-[400px] w-full max-w-5xl overflow-hidden rounded-xl">
        <Image src={imageUrl} alt={caption || ''} fill className="object-cover" />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm opacity-80">{caption}</figcaption>}
    </figure>
  )
}