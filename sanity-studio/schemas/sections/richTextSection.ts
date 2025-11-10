import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'richTextSection',
  title: 'Rich Text Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }], // Portable Text
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: (sel) => ({ title: sel.title || 'Rich Text' }),
  },
})