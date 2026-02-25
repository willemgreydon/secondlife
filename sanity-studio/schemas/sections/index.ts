// sanity-studio/schemas/sections/index.ts

import heroSection from './heroSection'
import textBlock from './textBlock'
import imageBlock from './imageBlock'
import statsSection from './statsSection'
import splitSection from './splitSection'
import gallerySection from './gallerySection'
import quoteSection from './quoteSection'
import partnersSection from './partnersSection'
import videoSection from './videoSection'
import accordionSection from './accordionSection'
import contactSection from './contactSection'
import richTextSection from './richTextSection'
import team from './team'
import teamSection from './teamSection'
import knowledgeSection from './knowledgeSection'
import blogPostsGridSection from './blogPostsGridSection'
import talentNetworkSection from './talentNetworkSection'

// Grids (new-style)
import missionsGrid from './missionsGrid'
import initiativesGrid from './initiativesGrid'
import eventsGrid from './eventsGrid'
import campaignGrid from './campaignGrid'
import impactStats from './impactStats'

// Legacy alias types (must exist because documents reference them)
import contactFormSection from './contactFormSection'
import campaignsSection from './campaignsSection'
import initiativesSection from './initiativesSection'
import missionsSection from './missionsSection'
import eventsSection from './eventsSection'
import impactStatsSection from './impactStatsSection'

// Export als Array – Single Source of Truth
export const sectionTypes = [
  // Core Sections
  heroSection,
  textBlock,
  imageBlock,
  statsSection,
  splitSection,
  gallerySection,
  quoteSection,
  partnersSection,
  videoSection,
  accordionSection,
  contactSection,
  richTextSection,

  // People / Org
  team,
  teamSection,

  // Knowledge / Blog
  knowledgeSection,
  blogPostsGridSection,

  // New grids / sections
  missionsGrid,
  initiativesGrid,
  eventsGrid,
  campaignGrid,
  impactStats,

  // Legacy aliases (keep for backwards compatibility)
  contactFormSection,
  campaignsSection,
  initiativesSection,
  missionsSection,
  eventsSection,
  impactStatsSection,

  // Careers
  talentNetworkSection,
]