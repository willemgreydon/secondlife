import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { initiativesListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function InitiativesIndexPage() {
  const initiatives = await sanityClient.fetch(initiativesListQuery).catch(() => [])

  const linkBlocks = initiatives.map((i: any) => ({
    _type: 'block',
    children: [
      { _type: 'span', text: i.title || 'Untitled initiative' },
      { _type: 'span', text: '  ' },
      { _type: 'link', href: `/initiatives/${i.slug}`, text: 'Learn more →' },
    ],
  }))

  const content = [
    {
      _type: 'initiativesGrid',
      _key: 'initiatives-index-grid',
      title: 'Initiatives',
      items: initiatives,
      initiatives,
    },
    {
      _type: 'textBlock',
      _key: 'initiatives-index-links',
      title: 'All initiatives (links)',
      body: linkBlocks,
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
