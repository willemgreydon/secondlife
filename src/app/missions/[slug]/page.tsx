// src/app/missions/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import {
  missionBySlugQuery,
  missionSlugsQuery,
  type MissionDoc,
} from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

export default async function MissionPage({
  params,
}: {
  // Next.js 16: params is a Promise
  params: Promise<SlugParams>
}) {
  const { slug } = await params
  const doc = await sanityClient.fetch<MissionDoc | null>(missionBySlugQuery, { slug }).catch(() => null)
  if (!doc) notFound()

  // Fallback across possible schema shapes
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
      <PageBuilder content={content} />
    </main>
  )
}

// Optional SSG parameters (works with dynamic='force-dynamic' too for previews)
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(missionSlugsQuery).catch(() => [])
  return slugs.map(({ slug }) => ({ slug }))
}
