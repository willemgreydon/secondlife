// sanity-studio/schemas/singletons/organisationPage.ts
import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'organisationPage',
  title: 'Organisation',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Organisation' }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'team' },
        { type: 'partnersSection' },
        { type: 'imageBlock' },
        { type: 'statsSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
      ],
    }),
  ],
})
