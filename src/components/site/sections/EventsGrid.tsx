'use client'
import Link from 'next/link'

export default function EventsGrid({ title, events = [] }: { title?: string; events?: any[] }) {
  if (!Array.isArray(events) || events.length === 0) return null
  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e: any) => (
          <li key={e._id} className="rounded-2xl border p-4">
            <Link href={`/events/${e.slug}`} className="text-lg font-semibold hover:underline">
              {e.title}
            </Link>
            {e.date && <div className="text-sm opacity-70">{new Date(e.date).toLocaleDateString()}</div>}
          </li>
        ))}
      </ul>
    </section>
  )
}
