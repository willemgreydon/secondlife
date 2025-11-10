'use client'

import { PortableText } from '@portabletext/react'

export default function TextBlock({
  title,
  body,
  align = 'left',
  width = 'default',
}: {
  title?: string
  body?: any
  align?: 'left' | 'center' | 'right'
  width?: 'narrow' | 'default' | 'wide'
}) {
  const alignCls =
    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
  const widthCls =
    width === 'narrow' ? 'max-w-2xl' : width === 'wide' ? 'max-w-6xl' : 'max-w-3xl'

  return (
    <section className={`mx-auto ${widthCls} px-4 py-16 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors`}>
      {title && <h2 className={`mb-4 text-3xl font-semibold ${alignCls}`}>{title}</h2>}
      {Array.isArray(body) ? (
        <div className={`prose prose-zinc dark:prose-invert ${alignCls}`}>
          <PortableText value={body} />
        </div>
      ) : body ? (
        <p className={`text-lg leading-relaxed ${alignCls}`}>{body}</p>
      ) : null}
    </section>
  )
}