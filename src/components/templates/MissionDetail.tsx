"use client";

import Image from "next/image";
import classNames from "clsx";

export default function MissionDetail({ mission }) {
  const {
    title,
    status,
    excerpt,
    coverUrl,
    fallbackUrl,
    gallery = [],
    metrics = [],
    content = [],
  } = mission;

  const heroImage = coverUrl || fallbackUrl;

  return (
    <article className="pb-20">
      {/* HERO */}
      <div className="relative w-full aspect-[16/7] bg-gray-200 dark:bg-gray-800">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            No image available
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="absolute bottom-6 left-6">
          <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur">
            {status}
          </span>
          <h1 className="mt-2 text-4xl font-bold text-white drop-shadow">
            {title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* EXCERPT */}
        {excerpt && (
          <p className="mt-8 text-lg text-muted-foreground">{excerpt}</p>
        )}

        {/* METRICS GRID */}
        {metrics.length > 0 && (
          <section className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {metrics.map((m) => (
              <div
                key={m.metric_key}
                className="rounded-lg border bg-gray-50 p-4 text-center dark:bg-gray-900 dark:border-gray-700"
              >
                <div className="text-2xl font-bold">
                  {m.current_value}
                  {m.unit && <span className="text-sm opacity-60"> {m.unit}</span>}
                </div>
                <div className="mt-1 text-sm opacity-80">{m.title}</div>
              </div>
            ))}
          </section>
        )}

        {/* GALLERY */}
        {gallery.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-4 text-xl font-semibold">Gallery</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {gallery.map((g, i) => (
                <div key={i} className="relative aspect-square">
                  <Image
                    src={g.url}
                    alt={g.alt || title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTENT SECTIONS */}
        <section className="mt-16 space-y-14">
          {content.map((section, index) => (
            <ContentRenderer key={index} section={section} />
          ))}
        </section>
      </div>
    </article>
  );
}

/* ------------------------------
   CONTENT RENDERER
------------------------------ */

function ContentRenderer({ section }) {
  switch (section._type) {
    case "textBlock":
      return (
        <div className="prose prose-neutral dark:prose-invert">
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </div>
      );

    case "imageBlock":
      return (
        <div className="my-8">
          {section.url && (
            <Image
              src={section.url}
              alt={section.alt || ""}
              width={1200}
              height={600}
              className="rounded-lg object-cover"
            />
          )}
          {section.caption && (
            <p className="mt-2 text-sm text-muted-foreground">{section.caption}</p>
          )}
        </div>
      );

    case "splitSection":
      return (
        <div className="grid gap-6 md:grid-cols-2">
          {section.leftImage && (
            <Image
              src={section.leftImage}
              alt=""
              width={800}
              height={600}
              className="rounded-lg object-cover"
            />
          )}
          {section.rightImage && (
            <Image
              src={section.rightImage}
              alt=""
              width={800}
              height={600}
              className="rounded-lg object-cover"
            />
          )}
        </div>
      );

    case "quoteSection":
      return (
        <blockquote className="border-l-4 pl-4 italic text-lg text-muted-foreground">
          “{section.quote}”
        </blockquote>
      );

    case "videoSection":
      return (
        <video
          controls
          src={section.videoUrl}
          className="w-full rounded-lg"
        />
      );

    default:
      return null;
  }
}
