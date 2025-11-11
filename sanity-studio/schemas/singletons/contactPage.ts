// sanity-studio/schemas/singletons/contactPage.ts
import {defineType, defineField} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export default defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Contact' }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'contactSection' },
        { type: 'imageBlock' },
        { type: 'accordionSection' },
      ],
    }),
  ],
})
