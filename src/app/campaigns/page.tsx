import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { campaignsListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CampaignsIndexPage() {
  const campaigns = await sanityClient.fetch(campaignsListQuery).catch(() => [])

  const linkBlocks = campaigns.map((c: any) => ({
    _type: 'block',
    children: [
      { _type: 'span', text: c.title || 'Untitled campaign' },
      { _type: 'span', text: '  ' },
      { _type: 'link', href: `/campaigns/${c.slug}`, text: 'Explore →' },
    ],
  }))

  const content = [
    {
      _type: 'campaignGrid',
      _key: 'campaigns-index-grid',
      title: 'Campaigns',
      items: campaigns,
      campaigns,
    },
    {
      _type: 'textBlock',
      _key: 'campaigns-index-links',
      title: 'All campaigns (links)',
      body: linkBlocks,
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
