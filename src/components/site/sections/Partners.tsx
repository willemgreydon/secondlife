'use client'
import Link from 'next/link'

export default function Partners({ title, partners = [] }: { title?: string; partners?: any[] }) {
  if (!Array.isArray(partners) || partners.length === 0) return null
  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((p: any) => (
          <li key={p._id} className="rounded-2xl border p-4">
            <Link href={`/partners/${p.slug}`} className="text-lg font-semibold hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
