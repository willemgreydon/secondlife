import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'partnersSection',
  title: 'Partners',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'All partners (links)'}),
    defineField({name: 'limit', type: 'number'}),
    defineField({
      name: 'layout',
      type: 'string',
      options: {list: [
        {title: 'Logos Grid', value: 'logos'},
        {title: 'Links List', value: 'links'},
      ], layout: 'radio'},
      initialValue: 'links',
    }),
    defineField({
      name: 'partners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
      description: 'Leer lassen = alle Partner.',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'layout'}},
})
