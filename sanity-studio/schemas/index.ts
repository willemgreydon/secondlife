// sanity-studio/schemas/index.ts

// documents
import home from './home'
import page from './page'
import blogPost from './blogPost'
import mission from './mission'
import campaign from './campaign'
import event from './event'
import partner from './partner'
import teamMember from './teamMember'
import initiative from './initiative'
import policyBrief from './policyBrief'
import publication from './publication'
import jobPosition from './jobPosition'

// sections (single source of truth)
import { sectionTypes } from './sections'

// standalone root-level section (as in your project)
import jobOpeningsSection from './jobOpeningsSection'

// objects
import metric from './objects/metric'

const schemas = [
  // documents
  page,
  home,
  mission,
  campaign,
  event,
  partner,
  teamMember,
  blogPost,
  initiative,
  jobPosition,
  policyBrief,
  publication,

  // sections / blocks
  ...sectionTypes,
  jobOpeningsSection,

  // objects
  metric,
]

export default schemas