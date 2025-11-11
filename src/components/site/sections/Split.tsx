'use client'
import React from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { getImageUrl } from '@/lib/sanity.image'

type Side =
  | { kind: 'image'; image?: any; alt?: string }
  | { kind: 'text'; text?: any[] }

export default function Split({
  title,
  left,
  right,
  layout = '50-50',
  reversed = false,
}: {
  title?: string
  left?: Side
  right?: Side
  layout?: '50-50' | '60-40' | '40-60'
  reversed?: boolean
}) {
  const [a, b] = reversed ? [right, left] : [left, right]

  const render = (s?: Side) => {
    if (!s) return null
    if (s.kind === 'image') {
      const url = getImageUrl((s as any).image)
      if (!url) return null
      return (
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={url}
            alt={(s as any).alt || ''}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )
    }
    return (s as any).text?.length ? <PortableText value={(s as any).text} /> : null
  }

  const grid =
    layout === '60-40'
      ? 'lg:grid-cols-[3fr_2fr]'
      : layout === '40-60'
      ? 'lg:grid-cols-[2fr_3fr]'
      : 'lg:grid-cols-2'

  const sides: Array<{ key: string; node: React.ReactNode }> = [
    { key: 'left', node: render(a) },
    { key: 'right', node: render(b) },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}

      <div className={`grid gap-6 ${grid}`}>
        {sides.map(({ key, node }) => (
          <div key={key}>{node}</div>
        ))}
      </div>
    </section>
  )
}
