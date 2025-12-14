import { defineType, defineField } from 'sanity'
import { Handshake } from 'lucide-react'

export default defineType({
  name: 'partnersSection',
  title: 'Partners Section',
  type: 'object',
  icon: Handshake,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Partners',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partner' }] }],
      description: 'Optional: select specific partners. Leave empty = show all.',
    }),

    defineField({
      name: 'linksOnly',
      title: 'Show as links only',
      type: 'boolean',
      initialValue: false,
      description: 'Enable only if you explicitly want a simple link list.',
    }),
  ],
})
