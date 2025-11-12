import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'eventsSection',
  title: 'Events Grid (legacy name)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'onlyUpcoming', title: 'Only upcoming', type: 'boolean', initialValue: true }),
    defineField({
      name: 'events', title: 'Events (optional manual pick)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }),
  ],
})
