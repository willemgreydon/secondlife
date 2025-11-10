// src/components/site/PageBuilder.tsx
'use client'

import Hero from './sections/Hero'
import Split from './sections/Split'
import Stats from './sections/Stats'
import TextBlock from './sections/TextBlock'
import Video from './sections/Video'
import TeamGrid from './sections/TeamGrid'
import ImageBlock from './sections/ImageBlock'
import Gallery from './sections/Gallery'
import Quote from './sections/Quote'
import Accordion from './sections/Accordion'
import Contact from './sections/Contact'
import ImpactStats from './sections/ImpactStats'
import CampaignGrid from './sections/CampaignGrid'
import InitiativesGrid from './sections/InitiativesGrid'
import MissionsGrid from './sections/MissionsGrid'
import EventsGrid from './sections/EventsGrid'
import Partners from './sections/Partners'

type Metric = {
  metric_key: string
  title: string
  current_value: number
  unit?: string
  as_of_date?: string
  description?: string
}

type PageBuilderContext = {
  // Hier können wir künftig mehr „globale“ Sachen reinreichen (z. B. breadcrumbs)
  metrics?: Metric[]
}

const COMPONENT_MAP: Record<string, any> = {
  hero: Hero,
  split: Split,
  stats: Stats,
  textBlock: TextBlock,
  video: Video,
  teamGrid: TeamGrid,
  imageBlock: ImageBlock,
  gallery: Gallery,
  quote: Quote,
  accordion: Accordion,
  contact: Contact,
  impactStats: ImpactStats,       // ⬅️ KPI-Section
  campaignGrid: CampaignGrid,
  initiativesGrid: InitiativesGrid,
  missionsGrid: MissionsGrid,
  eventsGrid: EventsGrid,
  partners: Partners,
}

// Aliase aus dem CMS → kanonische Keys
const TYPE_ALIASES: Record<string, string> = {
  heroSection: 'hero',
  splitSection: 'split',
  statsSection: 'stats',
  richTextSection: 'textBlock',
  videoSection: 'video',
  gallerySection: 'gallery',
  quoteSection: 'quote',
  accordionSection: 'accordion',
  contactSection: 'contact',
  team: 'teamGrid',
  imageBlock: 'imageBlock',

  // Komfort-Aliase für Metrik-Section
  metrics: 'impactStats',
  metricsSection: 'impactStats',
  impactStatsSection: 'impactStats',
}

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
  )
}

export default function PageBuilder({
  content = [] as any[],
  context,
}: {
  content?: any[]
  context?: PageBuilderContext
}) {
  const sections = Array.isArray(content) ? content : []
  if (!sections.length) return null

  return (
    <div className="bg-white text-gray-900 transition-colors dark:bg-black dark:text-gray-100">
      {sections.map((raw, idx) => {
        // Typ normalisieren
        const normalizedType = TYPE_ALIASES[raw._type] ?? raw._type
        let section: any = { ...raw, _type: normalizedType }

        // Props normalisieren (z. B. CTA)
        if (normalizedType === 'hero') {
          section = {
            ...section,
            ctaText: section.ctaText ?? section.ctaLabel ?? undefined,
          }
        }

        // ImpactStats: wenn im Section-Objekt keine metrics vorhanden,
        // automatisch aus context.metrics befüllen.
        if (normalizedType === 'impactStats') {
          const hasOwnMetrics = Array.isArray(section.metrics) && section.metrics.length > 0
          section = {
            ...section,
            metrics: hasOwnMetrics ? section.metrics : context?.metrics ?? [],
          }
        }

        const key = `${normalizedType}-${section._key ?? idx}`
        const Cmp = COMPONENT_MAP[normalizedType]

        if (!Cmp) return <UnknownSection key={key} section={raw} />
        return <Cmp key={key} {...section} />
      })}
    </div>
  )
}
