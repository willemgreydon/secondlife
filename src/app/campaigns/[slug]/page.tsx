import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { campaignBySlugQuery, campaignSlugsQuery } from '@/lib/sanity.queries'
import BackTo from '@/components/site/BackTo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

export default async function CampaignPage({ params }: { params: Promise<SlugParams> }) {
  const { slug } = await params
  const doc = await sanityClient.fetch(campaignBySlugQuery, { slug }).catch(() => null)
  if (!doc) notFound()

  const content =
    doc.content?.length ? doc.content
    : doc.contentSections?.length ? doc.contentSections
    : doc.sections?.length ? doc.sections
    : []

  return (
    <main className="min-h-screen">
      <BackTo href="/campaigns" className="pt-6" />
      <PageBuilder content={content} />
      <BackTo href="/campaigns" className="pb-10" />
    </main>
  )
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(campaignSlugsQuery).catch(() => [])
  return slugs.filter(Boolean).map((slug) => ({ slug }))
}
