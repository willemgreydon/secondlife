"use client";

import Image from "next/image";
import classNames from "clsx";
import { PortableText } from "@portabletext/react";

/* ---------------------------------------------------------
   HELPERS
--------------------------------------------------------- */

// Converts Sanity image _ref → CDN URL
function sanityRefToUrl(ref?: string) {
  if (!ref) return null;
  // image-<hash>-<width>x<height>-<format>
  const [, id, size, format] = ref.split("-");
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${size}.${format}`;
}

/* ---------------------------------------------------------
   TYPES (FIXED)
--------------------------------------------------------- */

export interface MissionDetailType {
  _id: string;
  title: string;
  slug: string;
  status?: string;
  excerpt?: string;
  coverUrl?: string | null;

  gallery?: {
    url?: string;
    caption?: string;
    alt?: string;
  }[] | null;

  metrics?: {
    metric_key: string;
    title: string;
    current_value: number;
    unit?: string;
    description?: string;
  }[] | null;

  content?: any[] | null;
}

interface MissionDetailProps {
  mission: MissionDetailType;
}

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */

export default function MissionDetail({ mission }: MissionDetailProps) {
  const title = mission?.title ?? "";
  const status = mission?.status ?? "";
  const excerpt = mission?.excerpt ?? "";

  const heroImage = mission?.coverUrl ?? null;

  const safeGallery = Array.isArray(mission?.gallery) ? mission.gallery : [];
  const safeMetrics = Array.isArray(mission?.metrics) ? mission.metrics : [];
  const safeContent = Array.isArray(mission?.content) ? mission.content : [];

  return (
    <article className="pb-24 bg-background dark:bg-black">
      {/* HERO */}
      <div className="relative w-full aspect-[16/5] bg-gray-200 dark:bg-gray-800">
        {heroImage && (
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-6 left-6">
          {status && (
            <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur">
              {status}
            </span>
          )}
          <h1 className="mt-2 text-4xl font-bold text-white">{title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6">
        {/* EXCERPT */}
        {excerpt && (
          <p className="mt-10 text-lg text-muted-foreground">{excerpt}</p>
        )}

        {/* METRICS */}
        {safeMetrics.length > 0 && (
          <section className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {safeMetrics.map((m) => (
              <div
                key={m.metric_key}
                className="rounded-xl border border-border bg-card p-5 text-center"
              >
                <div className="text-2xl font-bold">
                  {m.current_value}
                  {m.unit && (
                    <span className="ml-1 text-sm text-muted-foreground">
                      {m.unit}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {m.title}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* CONTENT */}
        {safeContent.length > 0 && (
          <section className="mt-20 space-y-20">
            {safeContent.map((section) => (
              <ContentRenderer key={section._key} section={section} />
            ))}
          </section>
        )}

        {/* GALLERY */}
        {safeGallery.length > 0 && (
          <section className="mt-24">
            <h2 className="mb-6 text-xl font-semibold">Gallery</h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {safeGallery
                .filter((g) => g?.url)
                .map((g, i) => (
                  <div key={i} className="overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={g.url!}
                      alt={g.alt || title}
                      width={800}
                      height={800}
                      className="h-full w-full object-cover"
                    />
                    {g.caption && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {g.caption}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

/* ---------------------------------------------------------
   CONTENT RENDERER (FIXED)
--------------------------------------------------------- */

function ContentRenderer({ section }: { section: any }) {
  if (section._type !== "splitSection") return null;

  const leftImageUrl =
    section.left?.image?.asset?.url ??
    sanityRefToUrl(section.left?.image?.asset?._ref);

  const rightImageUrl =
    section.right?.image?.asset?.url ??
    sanityRefToUrl(section.right?.image?.asset?._ref);

  return (
    <div
      className={classNames(
        "grid gap-10 md:grid-cols-2 items-center",
        section.reversed && "md:[&>*:first-child]:order-2"
      )}
    >
      {/* LEFT */}
      <div>
        {section.left?.kind === "text" && section.left.text && (
          <div className="prose prose-neutral dark:prose-invert">
            <PortableText value={section.left.text} />
          </div>
        )}

        {section.left?.kind === "image" && leftImageUrl && (
          <Image
            src={leftImageUrl}
            alt=""
            width={900}
            height={600}
            className="rounded-xl object-cover"
          />
        )}
      </div>

      {/* RIGHT */}
      <div>
        {section.right?.kind === "text" && section.right.text && (
          <div className="prose prose-neutral dark:prose-invert">
            <PortableText value={section.right.text} />
          </div>
        )}

        {section.right?.kind === "image" && rightImageUrl && (
          <Image
            src={rightImageUrl}
            alt=""
            width={900}
            height={600}
            className="rounded-xl object-cover"
          />
        )}
      </div>
    </div>
  );
}
