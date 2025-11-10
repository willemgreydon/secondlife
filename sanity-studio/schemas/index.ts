import type { SchemaTypeDefinition } from 'sanity'

// Dokumente
import beachCleanup from './beachCleanup'
import blogPost from './blogPost'
import campaign from './campaign'
import event from './event'
import home from './home'
import initiative from './initiative'
import mission from './mission'
import page from './page'
import partner from './partner'
import teamMember from './teamMember'
import metric from './objects/metrics'

// Sections
import heroSection from './sections/heroSection'
import textBlock from './sections/textBlock'
import imageBlock from './sections/imageBlock'
import statsSection from './sections/statsSection'
import splitSection from './sections/splitSection'
import gallerySection from './sections/gallerySection'
import quoteSection from './sections/quoteSection'
import videoSection from './sections/videoSection'
import accordionSection from './sections/accordionSection'
import contactSection from './sections/contactSection'
import richTextSection from './sections/richTextSection'
import missionsGrid from './sections/missionsGrid'
import team from './sections/team'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Dokumente
    page, 
    event, 
    campaign, 
    blogPost, 
    mission, 
    beachCleanup, 
    teamMember, 
    home, 
    partner, 
    initiative,
    metric,

    // Sections
    heroSection, 
    richTextSection, 
    textBlock, 
    team, 
    imageBlock, 
    statsSection,
    splitSection, 
    gallerySection, 
    quoteSection, 
    videoSection, 
    accordionSection, 
    contactSection, 
    missionsGrid,
  ],
}