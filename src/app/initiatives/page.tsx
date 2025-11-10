import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { initiativesListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function InitiativesIndexPage() {
  const initiatives = await sanityClient.fetch(initiativesListQuery).catch(() => [])

  const content = [
    {
      _type: 'initiativesGrid',    // Matches InitiativesGrid.tsx
      _key: 'initiatives-index',
      title: 'Initiatives',
      initiatives,                 // likely prop
      items: initiatives,          // safety alias
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
