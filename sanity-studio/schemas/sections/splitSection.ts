import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'splitSection',
  title: 'Split',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),

    // Inline "side block" (no separate type needed)
    defineField({
      name: 'left',
      title: 'Left',
      type: 'object',
      fields: [
        defineField({
          name: 'kind',
          title: 'Kind',
          type: 'string',
          initialValue: 'text',
          options: { list: ['text', 'image'], layout: 'radio' },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{ type: 'block' }],
          hidden: ({ parent }) => parent?.kind !== 'text',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.kind !== 'image',
        }),
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          hidden: ({ parent }) => parent?.kind !== 'image',
        }),
      ],
    }),

    defineField({
      name: 'right',
      title: 'Right',
      type: 'object',
      fields: [
        defineField({
          name: 'kind',
          title: 'Kind',
          type: 'string',
          initialValue: 'image',
          options: { list: ['text', 'image'], layout: 'radio' },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'array',
          of: [{ type: 'block' }],
          hidden: ({ parent }) => parent?.kind !== 'text',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.kind !== 'image',
        }),
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          hidden: ({ parent }) => parent?.kind !== 'image',
        }),
      ],
    }),

    defineField({
      name: 'layout',
      title: 'Layout (desktop)',
      type: 'string',
      initialValue: '50-50',
      options: {
        list: [
          { title: '50 / 50', value: '50-50' },
          { title: '40 / 60', value: '40-60' },
          { title: '60 / 40', value: '60-40' },
        ],
        layout: 'radio',
      },
    }),

    // Legacy fields (kept to avoid breaking old content;
    // hidden when new left/right is used)
    defineField({
      name: 'text',
      title: 'Legacy Text (deprecated)',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => !!(parent?.left || parent?.right),
    }),
    defineField({
      name: 'image',
      title: 'Legacy Image (deprecated)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => !!(parent?.left || parent?.right),
    }),
    defineField({
      name: 'reversed',
      title: 'Legacy: image left (desktop)',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !!(parent?.left || parent?.right),
    }),
  ],
  preview: {
    select: { title: 'title', lKind: 'left.kind', rKind: 'right.kind' },
    prepare({ title, lKind, rKind }) {
      const sides = [lKind || 'text?', rKind || 'image?'].join(' | ')
      return { title: title || 'Split', subtitle: sides }
    },
  },
})