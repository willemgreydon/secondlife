import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  fields: [
    defineField({ name: 'url', type: 'url', title: 'Video URL' }),
    defineField({ name: 'caption', type: 'string', title: 'Caption' })
  ]
})
