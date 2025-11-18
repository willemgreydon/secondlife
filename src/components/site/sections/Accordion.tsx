'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'

type AccordionItem = {
  title: string
  content: string | any[]   // Portable Text array
}

export default function Accordion({
  title,
  items = [],
}: {
  title?: string
  items?: AccordionItem[]
}) {
  return (
    <section className="mx-auto max-w-3xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <div className="divide-y rounded-2xl border">
        {items.map((it, i) => (
          <Row key={i} {...it} />
        ))}
      </div>
    </section>
  )
}

function Row({ title, content }: AccordionItem) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        className="w-full px-4 py-3 text-left font-medium"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
      </button>

      {open && (
        <div className="px-4 pb-4 text-sm opacity-80 space-y-2">
          {typeof content === 'string' ? (
            content
          ) : (
            <PortableText value={content} />
          )}
        </div>
      )}
    </div>
  )
}
