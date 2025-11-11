import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'impactStatsSection',
  title: 'Impact Stats',
  type: 'object',
  fields: [
    defineField({
      name: 'metrics',
      type: 'array',
      of: [{type: 'metric'}],
      description: 'Leer lassen = Frontend zieht globale/context metrics.',
    }),
  ],
  preview: {select: {title: 'metrics.0.title'}},
})
