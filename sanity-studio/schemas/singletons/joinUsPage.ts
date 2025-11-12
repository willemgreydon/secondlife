import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'joinUsPage',
  title: 'Join Us',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Join Us' }),

    // LEGACY
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
        { type: 'quoteSection' },
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'splitSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
        { type: 'impactStatsSection' },
        { type: 'partnersSection' },
        { type: 'team' },
      ],
    }),

    // LEGACY
    defineField({
      name: 'content',
      title: 'LEGACY: Content (do not use)',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'quoteSection' },
        { type: 'contactSection' },
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'splitSection' },
        { type: 'accordionSection' },
        { type: 'impactStatsSection' },
        { type: 'partnersSection' },
        { type: 'team' },
      ],
      hidden: true,
    }),
  ],
})
