// src/app/missions/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import BackTo from '@/components/site/BackTo'
import { sanityClient } from '@/lib/sanity.client'
import {
  missionBySlugQuery,
  pageBySlugOrIdQuery,
  missionsBeachCleanupsQuery,
} from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

export default async function MissionsSubPage({
  params,
}: { params: Promise<SlugParams> }) {
  const { slug } = await params

  // 1) Mission-Detail
  const mission = await sanityClient.fetch(missionBySlugQuery, { slug }).catch(() => null)
  if (mission) {
    const base =
      mission.content?.length
        ? mission.content
        : mission.contentSections?.length
        ? mission.contentSections
        : mission.sections?.length
        ? mission.sections
        : []

    const auto: any[] = [{
      _type: 'hero',
      _key: 'auto-hero',
      title: mission.title,
      subtitle:
        mission.excerpt ||
        (mission.status ? mission.status[0]?.toUpperCase() + mission.status.slice(1) : undefined),
      bgImage: mission?.cover?.asset?.url || mission?.fallback?.asset?.url,
      ctaHref: '/missions',
      ctaText: 'Back to Missions',
    }]

    if (Array.isArray(mission.metrics) && mission.metrics.length) {
      auto.push({ _type: 'impactStats', _key: 'auto-metrics', title: 'Mission Impact', metrics: mission.metrics })
    }
    if (Array.isArray(mission.gallery) && mission.gallery.length) {
      auto.push({
        _type: 'gallery',
        _key: 'auto-gallery',
        title: 'Gallery',
        images: mission.gallery.map((g: any) => ({
          _id: g.asset?._id,
          url: g.asset?.url || g.url,
          metadata: g.asset?.metadata,
          alt: g.alt, caption: g.caption,
        })),
      })
    }

    const content = [...auto, ...base]
    return (
      <main className="min-h-screen">
        <BackTo href="/missions" className="pt-6" />
        <div className="pt-6 pb-6">
          <PageBuilder content={content} context={{ metrics: mission.metrics ?? [] }} />
        </div>
        <BackTo href="/missions" className="pb-10" />
      </main>
    )
  }

  // 2) Page-Singleton unter /missions/<slug>
  const page = await sanityClient.fetch(pageBySlugOrIdQuery, { slug }).catch(() => null)
  if (page) {
    const content =
      page.content?.length
        ? page.content
        : page.contentSections?.length
        ? page.contentSections
        : page.sections?.length
        ? page.sections
        : []

    return (
      <main className="min-h-screen">
        <BackTo href="/missions" className="pt-6" />
        <PageBuilder content={content} />
        <BackTo href="/missions" className="pb-10" />
      </main>
    )
  }

  // 3) Spezieller Fallback: Beach Clean-Ups
  if (slug === 'beach-cleanups') {
    const items = await sanityClient.fetch(missionsBeachCleanupsQuery).catch(() => [])
    const content = [
      { _type: 'hero', _key: 'auto-hero', title: 'Beach Clean-Ups', subtitle: 'Shoreline clean-up missions', ctaHref: '/missions', ctaText: 'Back to Missions' },
      { _type: 'missionsGrid', _key: 'auto-grid', title: 'Missions', missions: items },
    ]
    return (
      <main className="min-h-screen">
        <BackTo href="/missions" className="pt-6" />
        <PageBuilder content={content} />
        <BackTo href="/missions" className="pb-10" />
      </main>
    )
  }

  notFound()
}
