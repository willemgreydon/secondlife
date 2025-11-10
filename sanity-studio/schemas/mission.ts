import { defineType, defineField } from 'sanity'
import { Compass } from 'lucide-react'
import metric from './objects/metrics'

export default defineType({
  name: 'mission',
  title: 'Mission',
  type: 'document',
  icon: Compass,
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Planned', value: 'planned' },
          { title: 'Active', value: 'active' },
          { title: 'Successful', value: 'successful' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'planned',
      validation: r => r.required(),
    }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({
      name: 'cover',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),

    // Flexible content sections for detail page
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

    // Per-mission metrics (KPIs)
    defineField({
      name: 'metrics',
      title: 'Metrics (KPIs)',
      type: 'array',
      of: [{ type: metric.name }],
      options: { sortable: true },
    }),
  ],
  preview: {
    select: { title: 'title', media: 'cover', subtitle: 'status' },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle }
    },
  },
})
