"use client";

import { SECTION_COMPONENTS } from "@/lib/cms/mapping";

type Metric = {
  metric_key: string;
  title: string;
  current_value: number;
  unit?: string;
  as_of_date?: string;
  description?: string;
};

type PageBuilderContext = {
  metrics?: Metric[];
  missions?: any[];
  initiatives?: any[];
  events?: any[];
};

function UnknownSection({ section }: { section: any }) {
  return (
    <div className="my-4 rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-200">
      <div className="font-semibold">
        Unknown section type: <code>{String(section?._type)}</code>
      </div>
      <pre className="mt-2 whitespace-pre-wrap text-xs opacity-80">
        {JSON.stringify(section, null, 2)}
      </pre>
    </div>
  );
}

function normalizeSectionType(rawType: string): string {
  const alias: Record<string, string> = {
    heroSection: "heroSection",
    splitSection: "splitSection",
    statsSection: "statsSection",
    richTextSection: "richTextSection",
    textBlock: "richTextSection",
    videoSection: "videoSection",
    gallerySection: "gallerySection",
    quoteSection: "quoteSection",
    accordionSection: "accordionSection",
    contactSection: "contactSection",
    imageBlock: "imageBlock",
    team: "teamSection",
    teamSection: "teamSection",
    metrics: "impactStatsSection",
    metricsSection: "impactStatsSection",
    impactStatsSection: "impactStatsSection",
    campaignsSection: "campaignGrid",
    missionsSection: "missionsGrid",
    initiativesSection: "initiativesGrid",
    eventsSection: "eventsGrid",
    partnersSection: "partnersSection",
  };

  return alias[rawType] ?? rawType;
}

export default function PageBuilder({
  content = [],
  context = {},
}: {
  content?: any[];
  context?: PageBuilderContext;
}) {
  const sections = Array.isArray(content) ? content : [];
  if (!sections.length) return null;

  return (
    <div className="bg-white text-gray-900 transition-colors dark:bg-black dark:text-gray-100 pb-28">
      <div className="space-y-10 md:space-y-14 lg:space-y-16">
        {sections.map((raw, idx) => {
          const normalizedType = normalizeSectionType(raw?._type);
          let section = { ...raw, _type: normalizedType };

          // Impact Stats context fallback
          if (normalizedType === "impactStatsSection") {
            const hasOwn = Array.isArray(section.metrics) && section.metrics.length > 0;
            section = {
              ...section,
              metrics: hasOwn ? section.metrics : context.metrics ?? [],
            };
          }

          // Missions weighting & filtering
          if (normalizedType === "missionsGrid") {
            const all = Array.isArray(context.missions) ? context.missions : [];
            const status = section.status ?? "all";
            const limit =
              typeof section.limit === "number" ? section.limit : 100;

            let missions = all;
            if (status !== "all") {
              missions = missions.filter((m: any) => m.status === status);
            }
            missions = missions.slice(0, limit);

            section = { ...section, missions, limit, status };
          }

          // Initiatives
          if (normalizedType === "initiativesGrid") {
            const all = context.initiatives ?? [];
            const limit =
              typeof section.limit === "number" ? section.limit : 100;

            section = {
              ...section,
              initiatives: all.slice(0, limit),
              limit,
            };
          }

          // Events
          if (normalizedType === "eventsGrid") {
            const all = context.events ?? [];
            const limit =
              typeof section.limit === "number" ? section.limit : 100;

            section = {
              ...section,
              events: all.slice(0, limit),
              limit,
            };
          }

          // Split-section migration (legacy support)
          if (normalizedType === "splitSection") {
            const isNew = section?.left || section?.right;
            const isLegacy = section?.main || section?.side || section?.images;

            if (isNew) {
              section = {
                ...section,
                reversed:
                  typeof section.reversed === "boolean"
                    ? section.reversed
                    : !!section.reverse,
              };
            } else if (isLegacy) {
              const firstImage = Array.isArray(section.images)
                ? section.images[0]
                : undefined;

              section = {
                ...section,
                layout: section.layout ?? "50-50",
                reversed: !!section.reverse,
                left: {
                  kind: "text",
                  text: Array.isArray(section.main) ? section.main : [],
                },
                right: {
                  kind: firstImage ? "image" : "text",
                  text: Array.isArray(section.side) ? section.side : [],
                  image: firstImage,
                },
              };
            }
          }

          const Component = SECTION_COMPONENTS[normalizedType];
          if (!Component) return <UnknownSection key={idx} section={raw} />;

          const key = section._key ?? `${normalizedType}-${idx}`;
          return <Component key={key} {...section} />;
        })}
      </div>
    </div>
  );
}
