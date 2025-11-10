import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mission',
  type: 'document',
  title: 'Mission',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({
      name: 'slug', type: 'slug', title: 'Slug',
      options: { source: 'title', maxLength: 96 }, validation: r => r.required()
    }),
    defineField({
      name: 'status', type: 'string', title: 'Status',
      options: { list: ['planned','active','successful'] },
      validation: r => r.required()
    }),
    defineField({ name: 'excerpt', type: 'text', title: 'Short description' }),
    defineField({ name: 'cover', type: 'image', title: 'Cover (preferred)' }),
    defineField({ name: 'image', type: 'image', title: 'Fallback image' }),
  ],
})