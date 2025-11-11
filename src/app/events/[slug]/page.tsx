// src/app/events/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import BackTo from '@/components/site/BackTo'
import { sanityClient } from '@/lib/sanity.client'
import { eventBySlugQuery, eventSlugsQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

export default async function EventPage({
  params,
}: {
  params: Promise<SlugParams>
}) {
  const { slug } = await params

  const doc = await sanityClient.fetch(eventBySlugQuery, { slug }).catch(() => null)
  if (!doc) notFound()

  const base =
    doc.content?.length
      ? doc.content
      : doc.contentSections?.length
      ? doc.contentSections
      : doc.sections?.length
      ? doc.sections
      : []

  const subtitle = [
    doc?.date
      ? new Date(doc.date).toLocaleString('en-GB', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : null,
    doc?.location || null,
  ].filter(Boolean).join(' • ')

  const content = [
    {
      _type: 'hero',
      _key: 'auto-hero',
      title: doc.title,
      subtitle,
      bgImage: doc?.cover?.asset?.url,
      ctaHref: '/events',
      ctaText: 'Back to Events',
    },
    ...base,
  ]

  return (
    <main className="min-h-screen">
      <BackTo href="/events" className="pt-6" />
      <PageBuilder content={content} />
      <BackTo href="/events" className="pb-10" />
    </main>
  )
}

// Optional bei force-dynamic
export async function generateStaticParams() {
  const slugs = await (await sanityClient.fetch<string[]>(eventSlugsQuery).catch(() => []))
  return slugs.filter(Boolean).map((slug) => ({ slug }))
}
