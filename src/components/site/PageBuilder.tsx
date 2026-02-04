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

type KnowledgeItem = {
  _id: string;
  title: string;
  summary?: string;
  publishedAt?: string;
  type: "policyBrief" | "publication";
  pdf?: {
    asset?: {
      url: string;
    };
  };
};

type PageBuilderContext = {
  metrics?: Metric[];
  missions?: any[];
  initiatives?: any[];
  events?: any[];
  team?: any[];
  partners?: any[];
  knowledgeItems?: KnowledgeItem[];
};

function UnknownSection({ section }: { section: any }) {
  return (
    <div className="my-4 rounded-md bg-red-50 p-4 text-red-700">
      <div className="font-semibold">
        Unknown section type: <code>{String(section?._type)}</code>
      </div>
      <pre className="mt-2 whitespace-pre-wrap text-xs opacity-80">
        {JSON.stringify(section, null, 2)}
      </pre>
    </div>
  );
}

/**
 * IMPORTANT:
 * We do NOT normalize textBlock → richTextSection.
 * Each Sanity _type must map to a compatible component.
 */
function normalizeSectionType(rawType: string): string {
  const alias: Record<string, string> = {
    heroSection: "heroSection",
    splitSection: "splitSection",
    statsSection: "statsSection",
    richTextSection: "richTextSection",
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
    contactFormSection: "contactFormSection",

    knowledgeSection: "knowledgeSection",

    blogPostsGridSection: "blogPostsGridSection",
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
    <div className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <div className="space-y-10 md:space-y-14 lg:space-y-16">
        {sections.map((raw, idx) => {
          const normalizedType = normalizeSectionType(raw?._type);
          let section = { ...raw, _type: normalizedType };

          if (normalizedType === "impactStatsSection") {
            section = {
              ...section,
              metrics:
                Array.isArray(section.metrics) && section.metrics.length
                  ? section.metrics
                  : context.metrics ?? [],
            };
          }

          if (normalizedType === "missionsGrid") {
            const all = context.missions ?? [];
            const status = section.status ?? "all";
            const limit =
              typeof section.limit === "number" ? section.limit : 100;

            const filtered =
              status === "all"
                ? all
                : all.filter((m: any) => m.status === status);

            section = { ...section, missions: filtered.slice(0, limit) };
          }

          if (normalizedType === "initiativesGrid") {
            const all = context.initiatives ?? [];
            const limit =
              typeof section.limit === "number" ? section.limit : 100;

            section = { ...section, initiatives: all.slice(0, limit) };
          }

          if (normalizedType === "eventsGrid") {
            const all = context.events ?? [];
            const limit =
              typeof section.limit === "number" ? section.limit : 100;

            section = { ...section, events: all.slice(0, limit) };
          }

          if (normalizedType === "partnersSection") {
            const all = Array.isArray(context.partners)
              ? context.partners
              : [];

            const selected =
              Array.isArray(section.partners) && section.partners.length
                ? all.filter(p =>
                    section.partners.some((ref: any) => ref._ref === p._id)
                  )
                : all;

            section = { ...section, partners: selected };
          }

          if (normalizedType === "teamSection") {
            const all = context.team ?? [];

            if (Array.isArray(section.members) && section.members.length > 0) {
              const ids = section.members.map((m: any) => m._ref);
              section = {
                ...section,
                members: all.filter((m: any) => ids.includes(m._id)),
              };
            } else {
              section = { ...section, members: all };
            }
          }

          if (normalizedType === "knowledgeSection") {
            section = { ...section, items: context.knowledgeItems ?? [] };
          }

          if (normalizedType === "blogPostsGridSection") {
            section = {
              ...section,
              posts: Array.isArray(section.posts) ? section.posts : [],
            };
          }

          const Component = SECTION_COMPONENTS[normalizedType];
          if (!Component) {
            return <UnknownSection key={idx} section={raw} />;
          }

          return <Component key={section._key ?? idx} {...section} />;
        })}
      </div>
    </div>
  );
}
