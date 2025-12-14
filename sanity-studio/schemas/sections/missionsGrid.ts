import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'missionsGrid',
  title: 'Missions Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'missions',
      title: 'Missions (optional)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'mission' }] }],
      description: 'Leave empty to show all missions.',
    }),
  ],
})
