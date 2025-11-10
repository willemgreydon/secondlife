import { defineType, defineField } from 'sanity'
import { LayoutTemplate } from 'lucide-react'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: LayoutTemplate,
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: r => r.required(),
    }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),

    defineField({
      name: 'content',
      title: 'Content (Sections)',
      type: 'array',
      options: { sortable: true },
      of: [
        { type: 'heroSection' },
        { type: 'splitSection' },
        { type: 'statsSection' },
        { type: 'textBlock' },
        { type: 'videoSection' },
        { type: 'team' },
        { type: 'imageBlock' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
        { type: 'campaignGrid' },
        { type: 'initiativesGrid' },
        { type: 'missionsGrid' },
        { type: 'eventsGrid' },
        { type: 'partners' },
        { type: 'impactStats' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
