// components/templates/EventDetail.tsx
"use client";

import Image from "next/image";
import PageBuilder from "@/components/site/PageBuilder";

export default function EventDetail({ event }: { event: any }) {
  return (
    <article className="pb-20">
      {/* HERO */}
      {event.coverUrl && (
        <div className="relative aspect-[16/7] w-full">
          <Image
            src={event.coverUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mt-8 text-4xl font-bold">{event.title}</h1>

        {event.date && (
          <div className="mt-2 text-sm opacity-70">
            {event.date} · {event.location}
          </div>
        )}

        {event.excerpt && (
          <p className="mt-6 text-lg">{event.excerpt}</p>
        )}

        {/* Content sections */}
        {Array.isArray(event.content) && event.content.length > 0 && (
          <div className="mt-16">
            <PageBuilder content={event.content} />
          </div>
        )}
      </div>
    </article>
  );
}
