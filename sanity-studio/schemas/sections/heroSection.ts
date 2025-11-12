// sanity-studio/schemas/sections/heroSection.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'subtitle', type: 'text', rows: 3 }),

    defineField({ name: 'ctaText', type: 'string', title: 'CTA Text' }),
    defineField({
      name: 'ctaHref',
      type: 'url',
      validation: r => r.uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),

    // LEGACY: vorhandene Inhalte tolerieren
    defineField({
      name: 'bgImage',
      title: 'LEGACY: Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
      hidden: true,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'LEGACY: CTA Label',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare: ({ title, media }) => ({ title: title || 'Hero', media }),
  },
})
