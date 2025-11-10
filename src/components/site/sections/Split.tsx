'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Side = {
  kind?: 'text' | 'image'
  text?: any
  imageUrl?: string
  alt?: string
}

type SplitProps = {
  _type: 'splitSection'
  _key: string
  title?: string
  layout?: '50-50' | '40-60' | '60-40'
  left: Side
  right: Side
}

const layoutToCols: Record<string, string> = {
  '50-50': 'md:grid-cols-2',
  '40-60': 'md:grid-cols-[2fr_3fr]',
  '60-40': 'md:grid-cols-[3fr_2fr]',
}

function RenderSide({ side }: { side: Side }) {
  if (side?.kind === 'image' && side.imageUrl) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl shadow-sm">
        {/* fixed aspect on small screens, grows naturally on md+ */}
        <div className="relative aspect-[4/3] md:aspect-[16/10]">
          <Image
            src={side.imageUrl}
            alt={side.alt || ''}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
    )
  }

  // default: text
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <PortableText value={side?.text ?? []} />
    </div>
  )
}

export default function Split(block: SplitProps) {
  const cols = layoutToCols[block.layout || '50-50'] || layoutToCols['50-50']

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {block.title ? (
        <h2 className="mb-6 text-xl font-semibold tracking-tight">{block.title}</h2>
      ) : null}

      <div className={cn('grid gap-8 md:gap-10', cols)}>
        <RenderSide side={block.left} />
        <RenderSide side={block.right} />
      </div>
    </section>
  )
}