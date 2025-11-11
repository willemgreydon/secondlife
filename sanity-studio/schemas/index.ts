import { type SchemaTypeDefinition } from 'sanity'

// -------- documents
import home from './home'
import initiative from './initiative'
import partner from './partner'
import page from './documents/page'
import teamMember from './teamMember'
import mission from './documents/mission'
import campaign from './campaign'
import event from './event'
import blogPost from './blogPost'
import post from './post'

// -------- sections (base)
import heroSection from './sections/heroSection'
import splitSection from './sections/splitSection'
import richTextSection from './sections/richTextSection'
import gallerySection from './sections/gallerySection'
import videoSection from './sections/videoSection'
import quoteSection from './sections/quoteSection'
import statsSection from './sections/statsSection'
import accordionSection from './sections/accordionSection'
import contactSection from './sections/contactSection'
import imageBlock from './sections/imageBlock'
import missionsGrid from './sections/missionsGrid'
import team from './sections/team'               // legacy: name 'team'
import teamSection from './sections/teamSection' // new: name 'teamSection'
import eventsGrid from './sections/eventsGrid'
import partnersSection from './sections/partners'
import impactStats from './sections/impactStats'
import campaignGrid from './sections/campaignGrid'
import initiativesGrid from './sections/initiativesGrid'

// -------- blocks
import textBlock from './blocks/textBlock'

// -------- objects used by sections
import metric from './objects/metric'           // Pfad anpassen, falls woanders

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    home,
    initiative,
    partner,
    page,
    teamMember,
    mission,
    campaign,
    event,
    blogPost,
    post,

    // base sections
    heroSection,
    splitSection,
    richTextSection,
    gallerySection,
    videoSection,
    quoteSection,
    statsSection,
    accordionSection,
    contactSection,

    // newly added / fixed sections
    imageBlock,
    missionsGrid,
    team,              // keep for backward-compat in docs that reference 'team'
    teamSection,       // allow new pages to use 'teamSection'
    eventsGrid,
    partnersSection,
    impactStats,
    campaignGrid,
    initiativesGrid,

    // blocks
    textBlock,

    // objects
    metric,
  ],
}
