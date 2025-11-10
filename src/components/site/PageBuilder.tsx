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

const COMPONENT_MAP: Record<string, any> = {
  // kanonische Keys
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
  // Sanity-Typ "team" soll TeamGrid rendern
  team: 'teamGrid',
  // imageBlock bleibt imageBlock (nur zur Vollständigkeit)
  imageBlock: 'imageBlock',
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

export default function PageBuilder({ content = [] as any[] }) {
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
            // Hero-Component kann ctaText erwarten: mappe ctaLabel → ctaText
            ctaText: section.ctaText ?? section.ctaLabel ?? undefined,
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