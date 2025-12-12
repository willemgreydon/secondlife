import {defineField, defineType} from 'sanity'

const sectionOf = [
  {type: 'heroSection'},
  {type: 'splitSection'},
  {type: 'richTextSection'},
  {type: 'gallerySection'},
  {type: 'videoSection'},
  {type: 'quoteSection'},
  {type: 'statsSection'},
  {type: 'accordionSection'},
  {type: 'contactSection'},
  {type: 'imageBlock'},

  {type: 'missionsGrid'},
  {type: 'campaignGrid'},
  {type: 'initiativesGrid'},
  {type: 'eventsGrid'},

  {type: 'team'},          // legacy
  {type: 'teamSection'},   // new

  {type: 'partners'},       // If your schema section is named "partners"
  {type: 'impactStats'}, // Optional
]

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug',  type: 'slug',   options: { source: 'title' }, validation: (R) => R.required() }),

    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: sectionOf,
    }),

    // Legacy fields for backward compatibility
    defineField({
      name: 'content',
      title: 'LEGACY content (hidden)',
      type: 'array',
      of: sectionOf,
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'sections',
      title: 'LEGACY sections (hidden)',
      type: 'array',
      of: sectionOf,
      readOnly: true,
      hidden: true,
    }),
  ],
})
