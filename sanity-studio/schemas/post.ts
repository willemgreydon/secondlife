import { defineType, defineField } from 'sanity'
import { MessageSquareText } from 'lucide-react'

export default defineType({
  name: 'post',
  title: 'Post (Legacy/Generic)',
  type: 'document',
  icon: MessageSquareText,
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
      of: [
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'videoSection' },
      ],
    }),
  ],
  preview: { select: { title: 'title' } },
})
