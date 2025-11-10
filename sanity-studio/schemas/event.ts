import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'start', type: 'datetime', title: 'Start' }),
    defineField({ name: 'end', type: 'datetime', title: 'End' }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt' })
  ]
})
