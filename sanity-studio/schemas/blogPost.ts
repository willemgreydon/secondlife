import { defineType, defineField } from 'sanity'
import { FileText } from 'lucide-react'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // Flexible PageBuilder content
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
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'cover', subtitle: 'publishedAt' },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle }
    },
  },
})
