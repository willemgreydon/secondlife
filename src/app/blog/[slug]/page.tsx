import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  type BlogPostDoc,
} from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

export default async function BlogPostPage({ params }: { params: Promise<SlugParams> }) {
  const { slug } = await params
  const doc = await sanityClient.fetch<BlogPostDoc | null>(blogPostBySlugQuery, { slug }).catch(() => null)
  if (!doc) notFound()

  const content =
    doc.content?.length
      ? doc.content
      : doc.contentSections?.length
      ? doc.contentSections
      : doc.sections?.length
      ? doc.sections
      : doc.body?.length
      ? doc.body
      : []

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(blogPostSlugsQuery).catch(() => [])
  return slugs.map(({ slug }) => ({ slug }))
}
