import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'accordionSection',
  title: 'Accordion Section',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'content', type: 'text', title: 'Content' },
      ]}],
    }),
  ],
})