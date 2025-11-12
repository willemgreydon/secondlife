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

    // LEGACY: slug beibehalten, aber verstecken
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      hidden: true,
    }),

    // Neues, kanonisches Feld
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'richTextSection' },
        { type: 'textBlock' },
        { type: 'splitSection' },
        { type: 'imageBlock' },
        { type: 'videoSection' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'statsSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
        { type: 'missionsSection' },
        { type: 'eventsSection' },
        { type: 'impactStatsSection' },
        { type: 'partnersSection' },
        { type: 'team' },
      ],
    }),

    // LEGACY: bisher genutztes Feld, versteckt halten
    defineField({
      name: 'content',
      title: 'LEGACY: Content (do not use)',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'richTextSection' },
        { type: 'textBlock' },
        { type: 'splitSection' },
        { type: 'imageBlock' },
        { type: 'videoSection' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'statsSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
        { type: 'missionsSection' },
        { type: 'eventsSection' },
        { type: 'impactStatsSection' },
        { type: 'partnersSection' },
        { type: 'team' },
      ],
      hidden: true,
    }),
  ],
})
