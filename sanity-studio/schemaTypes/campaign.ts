import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'status', title: 'Status', type: 'string',
      options: { list: ['planned','active','completed'] }, initialValue: 'active'
    }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text' }),
    defineField({ name: 'hero', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
  ],
})