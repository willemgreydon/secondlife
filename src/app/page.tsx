import PageBuilder from '@/components/site/PageBuilder'
import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity.client'
import { pageBySlugOrIdQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const page = await sanityClient
    .fetch(pageBySlugOrIdQuery, { slug: 'home' })
    .catch((e) => {
      console.error('[HOME] GROQ error:', e)
      return null
    })

  if (!page) notFound()

  return (
    <main className="min-h-screen">
      <PageBuilder content={page.contentSections ?? []} />
    </main>
  )
}