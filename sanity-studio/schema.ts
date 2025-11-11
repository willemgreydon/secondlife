// sanity-studio/schema.ts
import { type SchemaTypeDefinition } from 'sanity'

// -------- documents
import home from './schemas/home'
import initiative from './schemas/initiative'
import partner from './schemas/partner'
import page from './schemas/page'
import teamMember from './schemas/teamMember'
import mission from './schemas/mission'
import campaign from './schemas/campaign'
import event from './schemas/event'
import blogPost from './schemas/blogPost'
import post from './schemas/post'

// -------- objects / sections
import heroSection from './schemas/sections/heroSection'
import splitSection from './schemas/sections/splitSection'
import richTextSection from './schemas/sections/richTextSection'
import gallerySection from './schemas/sections/gallerySection'
import videoSection from './schemas/sections/videoSection'
import quoteSection from './schemas/sections/quoteSection'
import statsSection from './schemas/sections/statsSection'
import accordionSection from './schemas/sections/accordionSection'
import contactSection from './schemas/sections/contactSection'

// Sections we just added/aliased
import team from './schemas/sections/team'
import teamSection from './schemas/sections/teamSection'
import eventsGrid from './schemas/sections/eventsGrid'
import partnersSection from './schemas/sections/partners'
import impactStats from './schemas/sections/impactStats'
import campaignGrid from './schemas/sections/campaignGrid'
import initiativesGrid from './schemas/sections/initiativesGrid'

// Objects used by sections
import metric from './schemas/objects/metric' // <- Pfad an deinen tatsächlichen Ort anpassen

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

    // sections / objects
    heroSection,
    splitSection,
    richTextSection,
    gallerySection,
    videoSection,
    quoteSection,
    statsSection,
    accordionSection,
    contactSection,

    // newly registered sections
    team,
    teamSection,
    eventsGrid,
    partnersSection,
    impactStats,
    campaignGrid,
    initiativesGrid,

    // objects
    metric,
  ],
}
