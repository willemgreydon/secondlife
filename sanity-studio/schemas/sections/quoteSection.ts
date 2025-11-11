import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'quoteSection',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({name: 'quote', type: 'text', rows: 3, validation: r => r.required()}),
    defineField({name: 'author', type: 'string'}),
    defineField({name: 'role', type: 'string'}),
  ],
  preview: {select: {title: 'quote', subtitle: 'author'}},
})
