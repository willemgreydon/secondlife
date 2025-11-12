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
type PageBuilderContext = { metrics?: Metric[] }

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
  impactStats: ImpactStats,
  campaignGrid: CampaignGrid,
  initiativesGrid: InitiativesGrid,
  missionsGrid: MissionsGrid,
  eventsGrid: EventsGrid,
  partners: Partners,
}

// Aliase von Studio-Typen → interne Komponentennamen
const TYPE_ALIASES: Record<string, string> = {
  heroSection: 'hero',
  splitSection: 'split',
  statsSection: 'stats',
  richTextSection: 'textBlock',
  textBlock: 'textBlock',
  videoSection: 'video',
  gallerySection: 'gallery',
  quoteSection: 'quote',
  accordionSection: 'accordion',
  contactSection: 'contact',
  imageBlock: 'imageBlock',
  team: 'teamGrid',
  teamSection: 'teamGrid',
  metrics: 'impactStats',
  metricsSection: 'impactStats',
  impactStatsSection: 'impactStats',
  campaignsSection: 'campaignGrid',
  missionsSection: 'missionsGrid',
  initiativesSection: 'initiativesGrid',
  eventsSection: 'eventsGrid',
  partnersSection: 'partners',
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
      <div className="space-y-10 md:space-y-14 lg:space-y-16">
        {sections.map((raw, idx) => {
          const normalizedType = TYPE_ALIASES[raw?._type] ?? raw?._type
          let section: any = { ...raw, _type: normalizedType }

          if (normalizedType === 'hero') {
            section = {
              ...section,
              ctaText: section.ctaText ?? section.ctaLabel ?? undefined,
              image: section.image ?? section.bgImage ?? undefined,
            }
          }

          if (normalizedType === 'impactStats') {
            const hasOwn = Array.isArray(section.metrics) && section.metrics.length > 0
            section = { ...section, metrics: hasOwn ? section.metrics : context?.metrics ?? [] }
          }

          if (normalizedType === 'missionsGrid') {
            const limit = Number.isFinite(section?.limit) ? section.limit : 100
            const base = { ...section, limit, showMetrics: section?.showMetrics !== false }
            section = Array.isArray(section?.missions)
              ? { ...base, missions: section.missions.slice(0, limit) }
              : base
          }

          if (normalizedType === 'initiativesGrid') {
            const limit = Number.isFinite(section?.limit) ? section.limit : 100
            const base = { ...section, limit }
            section = Array.isArray(section?.initiatives)
              ? { ...base, initiatives: section.initiatives.slice(0, limit) }
              : base
          }

          if (normalizedType === 'eventsGrid') {
            const limit = Number.isFinite(section?.limit) ? section.limit : undefined
            section =
              limit && Array.isArray(section?.events)
                ? { ...section, events: section.events.slice(0, limit) }
                : section
          }

          if (normalizedType === 'split') {
            const isNew = section?.left || section?.right
            const isLegacy = section?.main || section?.side || section?.images
            if (isNew) {
              section = { ...section, reversed: typeof section.reversed === 'boolean' ? section.reversed : !!section.reverse }
            } else if (isLegacy) {
              const firstImage = Array.isArray(section.images) ? section.images[0] : undefined
              section = {
                ...section,
                layout: section.layout ?? '50-50',
                reversed: !!section.reverse,
                left: { kind: 'text', text: Array.isArray(section.main) ? section.main : [], image: undefined },
                right: { kind: firstImage ? 'image' : 'text', text: Array.isArray(section.side) ? section.side : [], image: firstImage },
              }
            }
          }

          const key = `${normalizedType}-${section?._key ?? idx}`
          const Cmp = COMPONENT_MAP[normalizedType]
          if (!Cmp) return <UnknownSection key={key} section={raw} />
          return <Cmp key={key} {...section} />
        })}
      </div>
    </div>
  )
}
