import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    defineField({
      name: 'stats', title: 'Stats', type: 'array',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'value', type: 'string' }] }]
    })
  ]
})
