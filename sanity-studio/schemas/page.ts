// sanity-studio/schemas/page.ts
import {defineType, defineField} from 'sanity'
import {FileText} from 'lucide-react'

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),

    // Neuer, einheitlicher Page-Builder-Container:
    defineField({
      name: 'content',
      title: 'Content Sections',
      type: 'array',
      of: [
        {type: 'heroSection'},
        {type: 'richTextSection'},
        {type: 'imageBlock'},
        {type: 'splitSection'},
        {type: 'videoSection'},
        {type: 'gallerySection'},
        {type: 'quoteSection'},
        {type: 'statsSection'},
        {type: 'accordionSection'},
        {type: 'contactSection'},
        {type: 'contactFormSection'},

        // Grids
        {type: 'campaignsSection'},
        {type: 'initiativesSection'},
        {type: 'missionsSection'},
        {type: 'eventsSection'},

        // Team / Partners / Impact
        {type: 'teamSection'},
        {type: 'partnersSection'},
        {type: 'impactStatsSection'},
      ],
    }),
  ],
})
