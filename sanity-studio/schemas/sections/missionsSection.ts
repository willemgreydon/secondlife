import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'missionsSection',
  title: 'Missions Grid',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'limit', type: 'number'}),
    defineField({
      name: 'status',
      type: 'string',
      options: {list: [
        {title: 'Planned', value: 'planned'},
        {title: 'Active', value: 'active'},
        {title: 'Successful', value: 'successful'},
      ]},
    }),
    defineField({
      name: 'missions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'mission'}]}],
      description: 'Optional: wähle konkrete Missions. Leer = per Query laden.',
    }),
    defineField({name: 'showMetrics', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'title', subtitle: 'status'}},
})
