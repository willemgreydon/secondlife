'use client'

import { useState } from 'react'

export default function Accordion({
  title,
  items,
}: {
  title?: string
  items?: { title: string; content: string }[]
}) {
  const [open, setOpen] = useState<number | null>(null)
  if (!items?.length) return null

  return (
    <section className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {title && <h2 className="mb-6 text-3xl font-semibold">{title}</h2>}
        <div className="divide-y divide-gray-200 dark:divide-zinc-800">
          {items.map((it, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full py-4 text-left font-medium hover:opacity-80"
              >
                {it.title}
              </button>
              {open === i && <div className="pb-4 text-sm opacity-90">{it.content}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}