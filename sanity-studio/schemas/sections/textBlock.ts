import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'body', title: 'Body',
      type: 'array', of: [{ type: 'block' }]
    }),
  ],
})
