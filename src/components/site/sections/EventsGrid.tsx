// src/components/site/sections/EventsGrid.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type EventItem = {
  _id: string
  title: string
  slug: string
  date?: string
  cover?: string
}

export default function EventsGrid({
  title = 'Events',
  events = [],
}: {
  title?: string
  events: EventItem[]
}) {
  if (!events?.length)
    return (
      <section className="py-16 text-center text-muted-foreground">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p>No events available at the moment.</p>
      </section>
    )

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event._id}
              href={`/events/${event.slug}`}
              className="group"
            >
              <Card className="overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                {event.cover && (
                  <div className="relative h-56 w-full">
                    <Image
                      src={event.cover}
                      alt={event.title}
                      fill
                      sizes="(max-width:768px)100vw,33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {event.date && (
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}