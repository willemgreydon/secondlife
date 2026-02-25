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
import JobOpeningsSection from "@/components/site/sections/JobOpeningsSection";
import TalentNetworkSection from "@/components/site/sections/TalentNetworkSection";

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

  missionsGrid: MissionsGrid,
  initiativesGrid: InitiativesGrid,
  campaignGrid: CampaignGrid,
  eventsGrid: EventsGrid,

  contactSection: Contact,
  contactFormSection: ContactFormSection,

  knowledgeSection: KnowledgeTabs,

  blogPostsGridSection: BlogPostsGrid,

  // CAREERS
  jobOpeningsSection: JobOpeningsSection,
  talentNetworkSection: TalentNetworkSection,
};