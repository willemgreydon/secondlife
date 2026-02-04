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
import BlogPostsGrid from "@/components/site/sections/BlogPostsGrid";

export const SECTION_COMPONENTS: Record<string, any> = {
  // CORE
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

  // PEOPLE / ORG
  teamSection: TeamGrid,
  partnersSection: PartnersSection,

  // GRIDS
  missionsGrid: MissionsGrid,
  initiativesGrid: InitiativesGrid,
  campaignGrid: CampaignGrid,
  eventsGrid: EventsGrid,

  // CONTACT
  contactSection: Contact,
  contactFormSection: ContactFormSection,

  // KNOWLEDGE
  knowledgeSection: KnowledgeTabs,

  // BLOG
  blogPostsGridSection: BlogPostsGrid,
};
