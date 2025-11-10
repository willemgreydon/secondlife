import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({ name: 'alt', type: 'string', title: 'Alt Text' })
  ]
})
