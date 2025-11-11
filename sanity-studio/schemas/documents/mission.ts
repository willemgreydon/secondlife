import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'mission',
  title: 'Mission',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: (R) => R.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (R) => R.required()}),
    defineField({
      name: 'status',
      type: 'string',
      options: {list: [
        {title: 'Planned', value: 'planned'},
        {title: 'Active', value: 'active'},
        {title: 'Completed', value: 'completed'},
      ]},
    }),
    defineField({name: 'cover', type: 'image', title: 'Cover'}),
    defineField({name: 'image', type: 'image', title: 'Alt Image'}),
    defineField({name: 'wasteCollectedKg', type: 'number', title: 'Waste collected (kg)', initialValue: 0}),
    defineField({name: 'volunteers', type: 'number', title: 'Volunteers', initialValue: 0}),
  ],
  preview: {select: {title: 'title', subtitle: 'status', media: 'cover'}},
})
