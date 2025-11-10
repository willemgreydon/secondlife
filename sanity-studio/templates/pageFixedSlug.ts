import type {InitialValueTemplateItem} from 'sanity'

export const pageFixedSlugTemplate: InitialValueTemplateItem = {
  id: 'page-fixed-slug',
  title: 'Page with fixed slug',
  schemaType: 'page',
  parameters: [
    {name: 'title', type: 'string'},
    {name: 'slug', type: 'string'},
  ],
  value: (params) => ({
    title: params?.title ?? '',
    slug: { _type: 'slug', current: params?.slug ?? '' },
    contentSections: [],
  }),
}