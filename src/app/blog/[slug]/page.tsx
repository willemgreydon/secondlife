import { notFound } from 'next/navigation'
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { blogPostBySlugQuery, blogPostSlugsQuery } from '@/lib/sanity.queries'
import BackTo from '@/components/site/BackTo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SlugParams = { slug: string }

export default async function BlogPostPage({ params }: { params: Promise<SlugParams> }) {
  const { slug } = await params
  const doc = await sanityClient.fetch(blogPostBySlugQuery, { slug }).catch(() => null)
  if (!doc) notFound()

  const content =
    doc.content?.length ? doc.content
    : doc.contentSections?.length ? doc.contentSections
    : doc.sections?.length ? doc.sections
    : doc.body?.length ? doc.body
    : []

  return (
    <main className="min-h-screen">
      <BackTo href="/blog" className="pt-6" />
      <PageBuilder content={content} />
      <BackTo href="/blog" className="pb-10" />
    </main>
  )
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<string[]>(blogPostSlugsQuery).catch(() => [])
  return slugs.filter(Boolean).map((slug) => ({ slug }))
}
