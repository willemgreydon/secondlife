import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'impactStats',
  title: 'Impact Stats',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{ type: 'metric' }], // <- dein bestehendes Metric-Object
    }),
  ],
})
