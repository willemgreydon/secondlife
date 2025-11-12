import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'impactStatsSection',
  title: 'Impact Stats (legacy name)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'metrics', title: 'Metrics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'metric_key', type: 'string', title: 'Key' },
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'current_value', type: 'number', title: 'Value' },
          { name: 'unit', type: 'string', title: 'Unit' },
          { name: 'as_of_date', type: 'date', title: 'As of' },
          { name: 'description', type: 'text', title: 'Description' },
        ]
      }]
    }),
  ],
})
