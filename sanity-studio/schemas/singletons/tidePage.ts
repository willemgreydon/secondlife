// sanity-studio/schemas/singletons/tidePage.ts
import {defineType, defineField} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export default defineType({
  name: 'tidePage',
  title: 'TIDE',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'TIDE' }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'missionsSection' },
        { type: 'impactStatsSection' },
        { type: 'imageBlock' },
        { type: 'videoSection' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'statsSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
      ],
    }),
  ],
})
