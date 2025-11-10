// sanity-studio/schemas/mission.ts
import { defineType, defineField } from 'sanity'
import { Flag } from 'lucide-react'

export default defineType({
  name: 'mission',
  title: 'Mission',
  type: 'document',
  icon: Flag,
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
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
      },
      initialValue: 'planned',
    }),
    defineField({ name: 'excerpt', title: 'Short description', type: 'text', rows: 3 }),

    defineField({
      name: 'cover',
      title: 'Cover (preferred)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'fallback',
      title: 'Fallback image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),

    // ---- NEW: Gallery field ----
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),

    // ---- NEW: Metrics array (nutzt dein objects/metrics.ts) ----
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{ type: 'metric' }],
      initialValue: [
        { metric_key: 'tons_collected', title: 'Plastic collected', current_value: 0, unit: 't',
          description: 'Estimated total plastic weight collected across missions' },
        { metric_key: 'volunteers', title: 'Volunteers engaged', current_value: 0, unit: 'people',
          description: 'Unique volunteers who participated in field operations' },
        { metric_key: 'missions_ytd', title: 'Missions completed (YTD)', current_value: 0, unit: 'missions',
          description: 'Distinct mission events in the current calendar year' },
        { metric_key: 'partner_orgs', title: 'Partner organizations', current_value: 0, unit: 'orgs',
          description: 'Organizations with active collaborations this year' },
        { metric_key: 'coastline_scanned_km', title: 'Coastline scanned', current_value: 0, unit: 'km',
          description: 'Cumulative coastline distance scanned by drones this year' },
        { metric_key: 'drone_flights', title: 'Drone flights', current_value: 0, unit: 'flights',
          description: 'Number of operational drone flights relevant to missions' },
      ],
      validation: (Rule) =>
        Rule.custom((arr: any[]) => {
          if (!Array.isArray(arr)) return true
          const keys = arr.map((m) => m?.metric_key).filter(Boolean)
          const dup = keys.some((k, i) => keys.indexOf(k) !== i)
          return dup ? 'Each metric_key should be unique' : true
        }),
    }),

    // Content sections for detail page
    defineField({
      name: 'content',
      title: 'Content (Sections)',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'splitSection' },
        { type: 'videoSection' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'statsSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
        { type: 'team' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'cover' },
  },
})
