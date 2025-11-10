import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [ defineField({ name: 'body', type: 'text', title: 'Body' }) ]
})
