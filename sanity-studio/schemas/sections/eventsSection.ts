import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'eventsSection',
  title: 'Events Grid',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'limit', type: 'number'}),
    defineField({
      name: 'events',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'event'}]}],
    }),
  ],
  preview: {select: {title: 'title'}},
})
