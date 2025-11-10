import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'quoteSection',
  title: 'Quote Section',
  type: 'object',
  fields: [
    defineField({ name: 'quote', type: 'text', title: 'Quote' }),
    defineField({ name: 'author', type: 'string', title: 'Author' })
  ]
})
