import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
    defineField({ name: 'ctaLabel', type: 'string', title: 'CTA Label' }),
    defineField({ name: 'ctaHref', type: 'string', title: 'CTA Link' }),
    defineField({ name: 'bgImage', type: 'image', title: 'Background Image', options: { hotspot: true } })
  ]
})