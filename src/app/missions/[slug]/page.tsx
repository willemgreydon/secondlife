// src/app/missions/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { missionBySlugQuery, missionSlugsQuery } from '@/lib/sanity.queries'
import BackTo from '@/components/site/BackTo'
import ImpactStats from '@/components/site/sections/ImpactStats'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

type Metric = {
  metric_key: string
  title: string
  current_value: number
  unit?: string
  as_of_date?: string
  description?: string
}

type MissionDoc = {
  content?: any[]
  contentSections?: any[]
  sections?: any[]
  metrics?: Metric[]
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

  const content =
    doc.content?.length
      ? doc.content
      : doc.contentSections?.length
      ? doc.contentSections
      : doc.sections?.length
      ? doc.sections
      : []

  return (
    <main className="min-h-screen">
      <BackTo href="/missions" className="pt-6" />

      <PageBuilder content={content} />

      {/* Mission-level KPIs */}
      {doc.metrics?.length ? (
        <ImpactStats metrics={doc.metrics} className="my-12" />
      ) : null}

      <BackTo href="/missions" className="pb-10" />
    </main>
  )
}

// ✅ missionSlugsQuery returns string[]
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(missionSlugsQuery).catch(() => [])
  return slugs.filter(Boolean).map((slug) => ({ slug }))
}
