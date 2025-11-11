// sanity-studio/schemas/index.ts

/**
 * Collections (document types)
 * Make sure these filenames exist exactly as imported.
 */
import mission from './mission'
import event from './event'          // you have "events.ts" in your tree
import campaign from './campaign'
import partner from './partner'
import teamMember from './teamMember'
import post from './post'

/**
 * Sections (object types used by the PageBuilder)
 * IMPORTANT: textBlock lives under ./blocks/textBlock.ts in your project.
 */
import heroSection from './sections/heroSection'
import textBlock from './blocks/textBlock'              // <-- FIXED PATH
import imageBlock from './sections/imageBlock'
import splitSection from './sections/splitSection'
import videoSection from './sections/videoSection'
import gallerySection from './sections/gallerySection'
import quoteSection from './sections/quoteSection'
import statsSection from './sections/statsSection'
import accordionSection from './sections/accordionSection'
import contactSection from './sections/contactSection'
import team from './sections/team'

// “grid” and “section” variants that I can see in your tree:
import campaignGrid from './sections/campaignGrid'
import initiativesGrid from './sections/initiativesGrid'
import missionsGrid from './sections/missionsGrid'
import eventsGrid from './sections/eventsGrid'

import campaignsSection from './sections/campaignsSection'
import initiativesSection from './sections/initiativesSection'
import missionsSection from './sections/missionsSection'
import eventsSection from './sections/eventsSection'

import impactStatsSection from './sections/impactStatsSection'
import partnersSection from './sections/partnersSection'

// Optional extras I see in your tree (safe to keep)
// If you don’t need them yet, you can comment them out.
// import richTextSection from './sections/richTextSection'
// import teamSection from './sections/teamSection'

/**
 * Reusable objects
 */
import metric from './objects/metric'

/**
 * Singleton pages (your site’s fixed pages)
 * These files should exist under ./singletons/ as we created earlier.
 */
import homePage from './singletons/homePage'
import tidePage from './singletons/tidePage'
import operationsPage from './singletons/operationsPage'
import joinUsPage from './singletons/joinUsPage'
import contactPage from './singletons/contactPage'
import organisationPage from './singletons/organisationPage'

/**
 * Export the aggregated schema array as default.
 * Sanity expects an array here.
 */
const schemas = [
  // Collections
  mission,
  event,
  campaign,
  partner,
  teamMember,
  post,

  // Sections
  heroSection,
  textBlock,            // <-- now resolves, coming from ./blocks/textBlock
  imageBlock,
  splitSection,
  videoSection,
  gallerySection,
  quoteSection,
  statsSection,
  accordionSection,
  contactSection,
  team,

  // Grid + Section variants
  campaignGrid,
  initiativesGrid,
  missionsGrid,
  eventsGrid,

  campaignsSection,
  initiativesSection,
  missionsSection,
  eventsSection,

  impactStatsSection,
  partnersSection,

  // Objects
  metric,

  // Singletons
  homePage,
  tidePage,
  operationsPage,
  joinUsPage,
  contactPage,
  organisationPage,
]

export default schemas
