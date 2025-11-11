import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'partners',
  title: 'Partners',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'partners',
      title: 'Partners (optional)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partner' }] }],
      description: 'Leave empty to render all partners via frontend query.',
    }),
  ],
})