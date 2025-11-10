// src/app/missions/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { missionBySlugQuery, missionSlugsQuery } from '@/lib/sanity.queries'
import BackTo from '@/components/site/BackTo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

type MissionDoc = {
  title?: string
  excerpt?: string
  cover?: { asset?: { url?: string } }
  content?: any[]
  metrics?: any[]
}

export default async function MissionPage({
  params,
}: {
  params: Promise<SlugParams>
}) {
  const { slug } = await params
  const doc = (await sanityClient
    .fetch<MissionDoc | null>(missionBySlugQuery, { slug })
    .catch(() => null)) as MissionDoc | null

  if (!doc) notFound()

  // Prefer normalized content from GROQ
  const fromSanity = Array.isArray(doc.content) ? doc.content : []

  // ✅ Fallback: build a minimal hero if no sections were authored yet
  const fallbackHero = {
    _type: 'hero', // PageBuilder alias-friendly
    _key: 'auto-hero',
    title: doc.title ?? '',
    subtitle: doc.excerpt ?? '',
    bgImage: doc.cover?.asset?.url ?? undefined,
    ctaHref: '/missions',
    ctaText: 'Back to Missions',
  }

  const sections = fromSanity.length ? fromSanity : [fallbackHero]

  return (
    <main className="min-h-screen">
      <BackTo href="/missions" className="pt-6" />

      {/* Pass metrics as context so impactStats can auto-fill */}
      <PageBuilder content={sections} context={{ metrics: doc.metrics }} />

      <BackTo href="/missions" className="pb-10" />
    </main>
  )
}

// Static params
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(missionSlugsQuery).catch(() => [])
  return slugs.filter(Boolean).map((slug) => ({ slug }))
}
