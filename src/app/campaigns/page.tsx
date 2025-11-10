import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { campaignsListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CampaignsIndexPage() {
  const campaigns = await sanityClient.fetch(campaignsListQuery).catch(() => [])

  const content = [
    {
      _type: 'campaignGrid',       // Matches CampaignGrid.tsx (lowerCamelCase)
      _key: 'campaigns-index',
      title: 'Campaigns',
      campaigns,                   // likely prop
      items: campaigns,            // safety alias
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
