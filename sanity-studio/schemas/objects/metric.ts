import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'metric',
  title: 'Metric',
  type: 'object',
  fields: [
    defineField({name: 'metric_key', type: 'string', validation: r => r.required()}),
    defineField({name: 'title', type: 'string', validation: r => r.required()}),
    defineField({name: 'current_value', type: 'number', validation: r => r.required()}),
    defineField({name: 'unit', type: 'string'}),
    defineField({name: 'as_of_date', type: 'date'}),
    defineField({name: 'description', type: 'text'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'metric_key'},
  },
})