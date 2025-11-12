// sanity-studio/schemas/index.ts
import home from './home'
import page from './page'
import post from './post'
import blogPost from './blogPost'
import mission from './mission'
import campaign from './campaign'
import event from './event'          // <— singular!
import partner from './partner'
import teamMember from './teamMember'
import initiative from './initiative'

// sections / blocks
import accordionSection from './sections/accordionSection'
import campaignGrid from './sections/campaignGrid'
import campaignsSection from './sections/campaignsSection'
import contactSection from './sections/contactSection'
import eventsGrid from './sections/eventsGrid'
import eventsSection from './sections/eventsSection'
import gallerySection from './sections/gallerySection'
import heroSection from './sections/heroSection'
import imageBlock from './sections/imageBlock'
import impactStats from './sections/impactStats'
import impactStatsSection from './sections/impactStatsSection'
import initiativesGrid from './sections/initiativesGrid'
import initiativesSection from './sections/initiativesSection'
import missionsGrid from './sections/missionsGrid'
import missionsSection from './sections/missionsSection'
import partnersSection from './sections/partnersSection'
import quoteSection from './sections/quoteSection'
import richTextSection from './sections/richTextSection'
import splitSection from './sections/splitSection'
import statsSection from './sections/statsSection'
import team from './sections/team'
import teamSection from './sections/teamSection'
import textBlock from './sections/textBlock'
import videoSection from './sections/videoSection'

// objects
import metric from './objects/metric'

const schemas = [
  // documents
  page, home, mission, campaign, event, partner, teamMember, blogPost, post, initiative,

  // sections / blocks
  heroSection, splitSection, statsSection, richTextSection, textBlock, imageBlock,
  gallerySection, videoSection, quoteSection, accordionSection, contactSection,
  team, teamSection, impactStats, initiativesGrid, missionsGrid, eventsGrid,
  partnersSection, campaignsSection, campaignGrid,

  // legacy alias types (damit alte Inhalte geladen werden)
  initiativesSection, missionsSection, eventsSection, impactStatsSection,

  // objects
  metric,
]

export default schemas
