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

  // Team – beide erlaubt, weil du beides registrierst
  {type: 'team'},          // legacy
  {type: 'teamSection'},   // neu

  // Partners – wähle den passenden Namen je nach Schema:
  // {type: 'partnersSection'},
  {type: 'partners'},       // <- falls dein ./sections/partners name: 'partners' hat

  // Optional: wenn du den einfachen Block auch direkt in Pages erlauben willst
  {type: 'textBlock'},
  // Impact KPIs Section
  {type: 'impactStats'},
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

    // Legacy-Felder sichtbar halten (versteckt), damit kein Warnbanner kommt
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
