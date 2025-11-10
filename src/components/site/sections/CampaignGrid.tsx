'use client'

import Image from 'next/image'

export default function CampaignGrid({
  title,
  campaigns = [],
}: {
  title?: string
  campaigns?: {
    _id: string
    title: string
    image?: string
    excerpt?: string
    slug?: { current: string }
  }[]
}) {
  if (!campaigns?.length) return null

  return (
    <section className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {title && <h2 className="mb-10 text-3xl font-semibold">{title}</h2>}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <a
              key={c._id}
              href={`/campaign/${c.slug?.current || c._id}`}
              className="group block overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-800
                         bg-white dark:bg-zinc-900 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              {c.image && (
                <div className="relative h-52 w-full">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                {c.excerpt && <p className="mt-2 text-sm opacity-80">{c.excerpt}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}