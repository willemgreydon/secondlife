'use client'
import Portable from '@/components/cms/Portable'

export default function TextBlock({ title, body }: { title?: string; body?: any[] }) {
  return (
    <section className="mx-auto max-w-3xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      {Array.isArray(body) && body.length > 0 && <Portable value={body} />}
    </section>
  )
}
