// sanity-studio/schemas/event.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'datetime', title: 'Date/Time', type: 'datetime' }),
    defineField({ name: 'cover', title: 'Cover', type: 'image', options: { hotspot: true } }),
    // optionaler, generischer Inhaltsbereich
    defineField({
      name: 'content', title: 'Content', type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'imageBlock' },
        { type: 'textBlock' },          // Wichtig: registriert in schemas/index.ts
        { type: 'richTextSection' },
        { type: 'splitSection' },
        { type: 'quoteSection' },
        { type: 'gallerySection' },
        { type: 'videoSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
      ]
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'cover' },
    prepare(v) { return v }
  }
})
