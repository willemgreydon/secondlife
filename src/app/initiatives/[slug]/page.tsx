import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import {
  initiativeBySlugQuery,
  initiativeSlugsQuery,
  type InitiativeDoc,
} from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

export default async function InitiativePage({ params }: { params: Promise<SlugParams> }) {
  const { slug } = await params
  const doc = await sanityClient.fetch<InitiativeDoc | null>(initiativeBySlugQuery, { slug }).catch(() => null)
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
      <PageBuilder content={content} />
    </main>
  )
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(initiativeSlugsQuery).catch(() => [])
  return slugs.map(({ slug }) => ({ slug }))
}
