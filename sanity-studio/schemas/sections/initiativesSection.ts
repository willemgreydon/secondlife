import {defineType, defineField} from 'sanity'

export default defineType({
  // Alias zum Weiterleben alter Inhalte
  name: 'initiativesSection',
  title: 'Initiatives Grid (legacy name)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'limit', title: 'Limit', type: 'number' }),
    defineField({
      name: 'initiatives', title: 'Initiatives (optional manual pick)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'initiative' }] }],
    }),
  ],
})
