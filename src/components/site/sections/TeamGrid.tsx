'use client'

import Image from 'next/image'

export default function TeamGrid({
  title,
  members = [],
  layout = 'grid',
}: {
  title?: string
  members?: {
    _id: string
    name: string
    role?: string
    image?: string
    linkedin?: string
    bio?: string
  }[]
  layout?: 'grid' | 'list'
}) {
  if (!members?.length) return null

  return (
    <section className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {title && <h2 className="mb-8 text-3xl font-semibold">{title}</h2>}
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'
              : 'space-y-8'
          }
        >
          {members.map((m) => (
            <article
              key={m._id}
              className="rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm
                         bg-white dark:bg-zinc-900 transition-colors"
            >
              {m.image && (
                <div className="mb-4 relative h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-medium">{m.name}</h3>
              {m.role && <p className="text-sm opacity-80">{m.role}</p>}
              {m.bio && <p className="mt-3 text-sm leading-relaxed opacity-90">{m.bio}</p>}
              {m.linkedin && (
                <a
                  className="mt-4 inline-block text-sm underline hover:opacity-80"
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}