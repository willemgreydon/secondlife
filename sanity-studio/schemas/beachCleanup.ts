import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'beachCleanup',
  title: 'Beach Clean-Up',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'date', type: 'date', title: 'Date' }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'participants', type: 'number', title: 'Participants' }),
    defineField({ name: 'summary', type: 'text', title: 'Summary' }),
    defineField({ name: 'status', type: 'string', title: 'Status', options: { list: ['Planned','Done'] } })
  ]
})