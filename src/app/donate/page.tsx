// src/app/donate/page.tsx
import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugOrIdQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DonatePage() {
  const page = await sanityClient.fetch(pageBySlugOrIdQuery, { slug: 'donate' }).catch(() => null)

  if (!page) {
    // Minimaler Fallback, bis CMS-Content da ist
    const content = [
      { _type: 'hero', _key: 'auto-hero', title: 'Donate', subtitle: 'Support our mission' },
      { _type: 'textBlock', _key: 'auto-text', title: 'Coming soon', body: [{ _type: 'block', children: [{ _type: 'span', text: 'This page is not yet configured in the CMS.' }] }] },
    ]
    return (
      <main className="min-h-screen">
        <PageBuilder content={content} />
      </main>
    )
  }

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
      <PageBuilder content={content} />
    </main>
  )
}
