// sanity-studio/schemas/singletons/operationsPage.ts
import {defineType, defineField} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'operationsPage',
  title: 'Operations',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Operations' }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'missionsSection' },
        { type: 'eventsSection' },
        { type: 'impactStatsSection' },
        { type: 'imageBlock' },
        { type: 'gallerySection' },
        { type: 'statsSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
      ],
    }),
  ],
})
