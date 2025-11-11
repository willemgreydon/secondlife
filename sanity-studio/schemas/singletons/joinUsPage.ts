// sanity-studio/schemas/singletons/joinUsPage.ts
import {defineType, defineField} from 'sanity'
import {UserPlusIcon} from '@sanity/icons'

export default defineType({
  name: 'joinUsPage',
  title: 'Join Us',
  type: 'document',
  icon: UserPlusIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Join Us' }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'impactStatsSection' },
        { type: 'imageBlock' },
        { type: 'splitSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
      ],
    }),
  ],
})
