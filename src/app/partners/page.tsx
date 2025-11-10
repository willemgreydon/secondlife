import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { partnersListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PartnersIndexPage() {
  const partners = await sanityClient.fetch(partnersListQuery).catch(() => [])

  const content = [
    {
      _type: 'partners',           // Matches Partners.tsx component
      _key: 'partners-index',
      title: 'Partners',
      partners,                    // likely prop
      items: partners,             // safety alias
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
