import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'initiativesSection',
  title: 'Initiatives Grid',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'limit', type: 'number'}),
    defineField({
      name: 'initiatives',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'campaign'}]}],
    }),
  ],
  preview: {select: {title: 'title'}},
})
