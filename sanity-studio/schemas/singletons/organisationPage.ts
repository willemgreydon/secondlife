import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'organisationPage',
  title: 'Organisation',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Organisation' }),

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
        { type: 'textBlock' },
        { type: 'richTextSection' },
        { type: 'team' },
        { type: 'partnersSection' },
        { type: 'imageBlock' },
        { type: 'statsSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
      ],
    }),

    // LEGACY
    defineField({
      name: 'content',
      title: 'LEGACY: Content (do not use)',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'richTextSection' },
        { type: 'team' },
        { type: 'partnersSection' },
        { type: 'imageBlock' },
        { type: 'statsSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
      ],
      hidden: true,
    }),
  ],
})
