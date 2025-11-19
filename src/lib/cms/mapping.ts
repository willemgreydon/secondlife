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
  Partners,
  CampaignGrid,
  InitiativesGrid,
  MissionsGrid,
  EventsGrid,
  Contact,
} from "@/components/site/sections";

export const SECTION_COMPONENTS: Record<string, any> = {
  // Standard Sections
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
  team: TeamGrid,
  partnersSection: Partners,
  eventsGrid: EventsGrid,
  contactSection: Contact,

  // Mission / Initiative / Campaign grids
  missionsSection: MissionsGrid,       // _type: "missionsSection"
  initiativesSection: InitiativesGrid, // _type: "initiativesSection"
  campaignsSection: CampaignGrid,      // _type: "campaignsSection"

  // Optional alias support
  missionsGrid: MissionsGrid,
  initiativesGrid: InitiativesGrid,
  campaignsGrid: CampaignGrid,

  // Safety fallback mapping
  missionSection: MissionsGrid,
  initiativeSection: InitiativesGrid,
  campaignSection: CampaignGrid,
};
