// sanity-studio/schemas/sections/richTextSection.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'richTextSection',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
