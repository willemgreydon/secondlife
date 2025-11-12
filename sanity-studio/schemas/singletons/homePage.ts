import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Home' }),

    // LEGACY tolerieren (verhindert "Unknown fields")
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      hidden: true,
    }),

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
        { type: 'campaignsSection' },
        { type: 'missionsSection' },
        { type: 'initiativesSection' },
        { type: 'eventsSection' },
        { type: 'impactStatsSection' },
        { type: 'partnersSection' },
        { type: 'team' },
      ],
    }),

    // LEGACY: altes Feld akzeptieren, aber verstecken
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
        { type: 'campaignsSection' },
        { type: 'missionsSection' },
        { type: 'initiativesSection' },
        { type: 'eventsSection' },
        { type: 'impactStatsSection' },
        { type: 'partnersSection' },
        { type: 'team' },
      ],
      hidden: true,
    }),
  ],
})
