// src/app/[slug]/page.tsx
import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

export default async function Page({
  params,
}: {
  params: Promise<SlugParams>
}) {
  const { slug } = await params

  const page = await sanityClient
    .fetch(pageBySlugQuery, { slug })
    .catch(() => null)

  if (!page) notFound()

  // normalize content
  const content =
    page.content?.length
      ? page.content
      : page.contentSections?.length
      ? page.contentSections
      : page.sections?.length
      ? page.sections
      : []

  // ✅ Auto-Inject "team" auf /our-team, falls Redaktion es vergessen hat
  const hasTeam = content.some((s: any) => (s?._type ?? s?.type) === 'team')
  const enriched =
    slug === 'our-team' && !hasTeam
      ? [{ _type: 'team', _key: 'auto-team' }, ...content]
      : content

  return (
    <main className="min-h-screen">
      <PageBuilder content={enriched} />
    </main>
  )
}
