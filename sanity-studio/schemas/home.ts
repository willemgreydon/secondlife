import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'hero', title: 'Hero', type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'subtitle', type: 'text', title: 'Subtitle' },
        { name: 'ctaLabel', type: 'string', title: 'CTA Label' },
        { name: 'ctaHref', type: 'string', title: 'CTA Link' },
        { name: 'bgImage', type: 'image', title: 'Background Image', options: { hotspot: true } }
      ]
    }),
    defineField({
      name: 'stats', title: 'Stats', type: 'array',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'value', type: 'string' }] }]
    }),
    defineField({
      name: 'initiatives', title: 'Initiatives', type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'description', type: 'text' }, { name: 'href', type: 'string' }] }]
    }),
    defineField({
      name: 'partners', title: 'Partners', type: 'array',
      of: [{ type: 'object', fields: [{ name: 'name', type: 'string' }, { name: 'logo', type: 'image', options: { hotspot: true } }] }]
    })
  ]
})