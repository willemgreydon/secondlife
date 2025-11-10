import { defineType } from 'sanity'

export default defineType({
  name: 'eventsGrid',
  title: 'Events Grid',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Section Title' },
    {
      name: 'onlyUpcoming',
      type: 'boolean',
      title: 'Show only upcoming events?',
      initialValue: true,
    },
  ],
})