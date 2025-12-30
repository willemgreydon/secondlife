import {
  Hero,
  TextBlock,
  RichText,
  ImageBlock,
  Video,
  Stats,
  ImpactStats,
  Accordion,
  Split,
  Gallery,
  Quote,
  TeamGrid,
  PartnersSection,
  CampaignGrid,
  InitiativesGrid,
  MissionsGrid,
  EventsGrid,
  Contact,
  ContactFormSection,
} from "@/components/site/sections";

import KnowledgeTabs from "@/components/knowledge/KnowledgeTabs";

export const SECTION_COMPONENTS: Record<string, any> = {
  heroSection: Hero,
  textBlock: TextBlock,
  richTextSection: RichText,
  imageBlock: ImageBlock,
  videoSection: Video,
  statsSection: Stats,
  impactStatsSection: ImpactStats,
  splitSection: Split,
  gallerySection: Gallery,
  quoteSection: Quote,
  accordionSection: Accordion,
  teamSection: TeamGrid,
  partnersSection: PartnersSection,
  eventsGrid: EventsGrid,
  contactSection: Contact,

  // GRID SECTIONS
  missionsGrid: MissionsGrid,
  initiativesGrid: InitiativesGrid,
  campaignGrid: CampaignGrid,
  contactFormSection: ContactFormSection,

  // KNOWLEDGE
  knowledgeSection: KnowledgeTabs,
};
