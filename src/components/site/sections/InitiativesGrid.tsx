'use client'

import Image from 'next/image'

export default function InitiativesGrid({
  title,
  initiatives = [],
}: {
  title?: string
  initiatives?: {
    _id: string
    title: string
    description?: string
    image?: string
    link?: string
  }[]
}) {
  if (!initiatives?.length) return null

  return (
    <section className="bg-gray-50 text-gray-900 dark:bg-zinc-900 dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {title && <h2 className="mb-10 text-3xl font-semibold">{title}</h2>}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((i) => (
            <a
              key={i._id}
              href={i.link || '#'}
              className="group block rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              {i.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={i.image}
                    alt={i.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold">{i.title}</h3>
                {i.description && (
                  <p className="mt-2 text-sm opacity-80">{i.description}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}