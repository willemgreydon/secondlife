import { defineType, defineField } from 'sanity'
import { BarChart2 } from 'lucide-react'

export default defineType({
  name: 'metric',
  title: 'Metric',
  type: 'object',
  icon: BarChart2,
  fields: [
    defineField({
      name: 'metric_key',
      title: 'Metric Key',
      type: 'string',
      options: {
        list: [
          { title: 'Plastic collected (t)', value: 'tons_collected' },
          { title: 'Volunteers engaged', value: 'volunteers' },
          { title: 'Missions completed (YTD)', value: 'missions_ytd' },
          { title: 'Partner organizations', value: 'partner_orgs' },
          { title: 'Coastline scanned (km)', value: 'coastline_scanned_km' },
          { title: 'Drone flights', value: 'drone_flights' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'current_value',
      title: 'Current Value',
      type: 'number',
      description: 'e.g. 6.2 or 412',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 't, people, missions, orgs, km, flights',
    }),
    defineField({
      name: 'as_of_date',
      title: 'As of Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      value: 'current_value',
      unit: 'unit',
      subtitle: 'metric_key',
    },
    prepare({ title, value, unit, subtitle }) {
      return {
        title: `${title} — ${value ?? '–'}${unit ? ` ${unit}` : ''}`,
        subtitle,
      }
    },
  },
})
