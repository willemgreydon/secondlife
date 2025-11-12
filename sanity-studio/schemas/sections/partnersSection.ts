// sanity-studio/schemas/sections/partnersSection.ts
import {defineType, defineField} from 'sanity'
import {Handshake} from 'lucide-react'

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
      initialValue: 'All partners (links)',
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
      of: [{type: 'reference', to: [{type: 'partner'}]}],
      description: 'Optional: wähle spezifische Partner. Leer lassen = alle.',
    }),
    defineField({
      name: 'linksOnly',
      title: 'Show as links only',
      type: 'boolean',
      initialValue: true,
      description: 'Wenn aktiv: nur Linkliste ohne Logos/Grid.',
    }),
  ],
})
