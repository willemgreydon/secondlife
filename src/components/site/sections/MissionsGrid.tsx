// src/components/site/sections/MissionsGrid.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type MissionItem = {
  _id: string
  title: string
  slug: string
  status?: string
  cover?: string
  excerpt?: string
}

export default function MissionsGrid({
  title = 'Missions',
  missions = [],
}: {
  title?: string
  missions: MissionItem[]
}) {
  if (!missions?.length) return null

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((m) => (
            <Link key={m._id} href={`/missions/${m.slug}`} className="group">
              <Card className="overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2">
                {m.cover && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={m.cover}
                      alt={m.title}
                      fill
                      sizes="(max-width:768px)100vw,33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="leading-tight line-clamp-2">
                    {m.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-between">
                  {m.status && (
                    <span className="rounded-md border px-2 py-0.5 text-xs capitalize text-muted-foreground">
                      {m.status}
                    </span>
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
