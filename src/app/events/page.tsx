import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { eventsListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EventsIndexPage() {
  const events = await sanityClient.fetch(eventsListQuery).catch(() => [])

  const content = [
    {
      _type: 'eventsGrid',
      _key: 'events-index',
      title: 'Events',
      events,
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}