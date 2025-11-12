'use client'
import Link from 'next/link'

export default function CampaignGrid({ title, campaigns = [] }: { title?: string; campaigns?: any[] }) {
  if (!Array.isArray(campaigns) || campaigns.length === 0) return null
  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((c) => (
          <li key={c._id} className="rounded-2xl border p-4">
            <Link href={`/campaigns/${c.slug}`} className="text-lg font-semibold hover:underline">
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
