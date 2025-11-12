'use client'
import Link from 'next/link'

export default function InitiativesGrid({ title, initiatives = [] }: { title?: string; initiatives?: any[] }) {
  if (!Array.isArray(initiatives) || initiatives.length === 0) return null
  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {initiatives.map((i: any) => (
          <li key={i._id} className="rounded-2xl border p-4">
            <Link href={`/initiatives/${i.slug}`} className="text-lg font-semibold hover:underline">
              {i.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
