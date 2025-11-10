import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: R => R.optional() // bei Singleton-Kollisionen kein Stress
    }),
    defineField({
      name: 'content',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'statsSection' },
        { type: 'splitSection' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'videoSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
        { type: 'richTextSection' },
        { type: 'missionsGrid' }
      ]
    })
  ]
})