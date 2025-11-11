import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamSection',
  title: 'Team',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', initialValue: 'Our Team' }),
    defineField({
      name: 'members',
      title: 'Members (optional)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      description: 'Leave empty to show all published team members.',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: { list: [{ title: 'Grid', value: 'grid' }, { title: 'List', value: 'list' }], layout: 'radio' },
      initialValue: 'grid',
    }),
  ],
})
