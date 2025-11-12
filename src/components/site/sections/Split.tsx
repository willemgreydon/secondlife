'use client'
import Image from 'next/image'
import Portable from '@/components/cms/Portable'
import { getImageUrl } from '@/lib/sanity.image'

type Side =
  | { kind: 'text'; text?: any[]; image?: any; alt?: string }
  | { kind: 'image'; image?: any; alt?: string; text?: any[] }

export default function Split({
  title,
  layout = '50-50',
  reversed = false,
  left,
  right,
}: {
  title?: string
  layout?: '50-50' | '40-60' | '60-40'
  reversed?: boolean
  left?: Side
  right?: Side
}) {
  const cols =
    layout === '40-60' ? 'md:grid-cols-[2fr_3fr]' : layout === '60-40' ? 'md:grid-cols-[3fr_2fr]' : 'md:grid-cols-2'

  const L = reversed ? right : left
  const R = reversed ? left : right

  const renderSide = (s?: Side) => {
    if (!s) return null
    if (s.kind === 'image') {
      const url = getImageUrl((s as any).image)
      if (!url) return null
      return (
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
          <Image src={url} alt={(s as any).alt || ''} fill sizes="50vw" className="object-cover" />
        </div>
      )
    }
    return <Portable value={(s as any).text ?? []} />
  }

  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-6 text-3xl font-semibold">{title}</h2>}
      <div className={`grid gap-6 ${cols}`}>{[renderSide(L), renderSide(R)].map((c, i) => c && <div key={i}>{c}</div>)}</div>
    </section>
  )
}
