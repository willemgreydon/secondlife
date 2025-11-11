// sanity-studio/schemas/singletons/homePage.ts
import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Home' }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'missionsSection' },
        { type: 'campaignsSection' },
        { type: 'initiativesSection' },
        { type: 'impactStatsSection' },
        { type: 'eventsSection' },
        { type: 'partnersSection' },
        { type: 'imageBlock' },
        { type: 'splitSection' },
        { type: 'videoSection' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'statsSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
        { type: 'team' },
      ],
    }),
  ],
  preview: {select: {title: 'title'}},
})
