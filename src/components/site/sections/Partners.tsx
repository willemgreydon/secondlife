'use client'

import Image from 'next/image'

export default function Partners({
  title,
  partners = [],
}: {
  title?: string
  partners?: {
    _id: string
    name: string
    logo?: string
    website?: string
  }[]
}) {
  if (!partners?.length) return null

  return (
    <section className="bg-gray-50 text-gray-900 dark:bg-zinc-900 dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        {title && <h2 className="mb-10 text-3xl font-semibold">{title}</h2>}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {partners.map((p) => (
            <a
              key={p._id}
              href={p.website || '#'}
              target="_blank"
              rel="noreferrer"
              className="group relative mx-auto flex h-24 w-40 items-center justify-center rounded-lg
                         border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition"
            >
              {p.logo ? (
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  className="object-contain p-4 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition"
                />
              ) : (
                <span className="text-sm font-medium opacity-70">{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}