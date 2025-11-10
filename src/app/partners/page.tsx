import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { partnersListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PartnersIndexPage() {
  const partners = await sanityClient.fetch(partnersListQuery).catch(() => [])

  // Prefer internal detail page if we have a slug; otherwise fall back to external url
  const linkBlocks = partners.map((p: any) => {
    const href = p.slug ? `/partners/${p.slug}` : (p.url || '#')
    const text = p.slug ? 'Profile →' : 'Website →'
    return {
      _type: 'block',
      children: [
        { _type: 'span', text: p.title || 'Partner' },
        { _type: 'span', text: '  ' },
        { _type: 'link', href, text },
      ],
    }
  })

  const content = [
    {
      _type: 'partners',
      _key: 'partners-index-grid',
      title: 'Partners',
      items: partners.map((p: any) => ({
        _id: p._id,
        name: p.title ?? p.name,
        url: p.url,
        logo: p.logo,
        slug: p.slug,
      })),
    },
    {
      _type: 'textBlock',
      _key: 'partners-index-links',
      title: 'All partners (links)',
      body: linkBlocks,
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
