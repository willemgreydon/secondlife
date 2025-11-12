import {defineType, defineField} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export default defineType({
  name: 'tidePage',
  title: 'TIDE',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'TIDE' }),

    // LEGACY: slug vorhanden lassen, aber nicht anzeigen
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      hidden: true,
    }),

    // Neue, kanonische Sections
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'richTextSection' },
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'splitSection' },
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

    // LEGACY: vorhandenes altes Feld tolerieren (hidden)
    defineField({
      name: 'content',
      title: 'LEGACY: Content (do not use)',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'richTextSection' },
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'splitSection' },
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
