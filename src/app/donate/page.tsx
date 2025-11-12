import PageBuilder from '@/components/site/PageBuilder'
import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugOrIdQuery } from '@/lib/sanity.queries'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function DonatePage() {
  const page = await sanityClient.fetch(pageBySlugOrIdQuery, { slug: 'donate' }).catch(() => null)
  if (!page) notFound()
  const content = page.content?.length ? page.content : page.contentSections?.length ? page.contentSections : page.sections ?? []
  return <PageBuilder content={content} />
}
