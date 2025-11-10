import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'hero', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'status', type: 'string', options: { list: ['draft', 'active', 'completed'] }, initialValue: 'draft' }),
  ],
});