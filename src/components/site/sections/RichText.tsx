'use client'

import { PortableText } from '@portabletext/react'

export default function RichText({ body }: { body?: any }) {
  if (!body) return null
  return (
    <section className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <div className="prose prose-zinc dark:prose-invert mx-auto max-w-3xl px-6 py-16">
        <PortableText value={body} />
      </div>
    </section>
  )
}