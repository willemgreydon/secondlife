import { defineType, defineField } from 'sanity'
import { Megaphone } from 'lucide-react'

export default defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  icon: Megaphone,
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
      name: 'cover',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'startDate',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      type: 'date',
    }),

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
        { type: 'imageBlock' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
        { type: 'partners' },
        { type: 'eventsGrid' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'cover', subtitle: 'startDate' },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle }
    },
  },
})
