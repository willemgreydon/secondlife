import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { eventsListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EventsIndexPage() {
  const events = await sanityClient.fetch(eventsListQuery).catch(() => [])

  const linkBlocks = events.map((e: any) => ({
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: `${e.date ? new Date(e.date).toLocaleDateString('en-GB') + ' — ' : ''}${e.title || 'Untitled event'}`,
      },
      { _type: 'span', text: '  ' },
      { _type: 'link', href: `/events/${e.slug}`, text: 'Details →' },
    ],
  }))

  const content = [
    {
      _type: 'eventsGrid',
      _key: 'events-index-grid',
      title: 'Events',
      events,
    },
    {
      _type: 'textBlock',
      _key: 'events-index-links',
      title: 'All events (links)',
      body: linkBlocks,
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
