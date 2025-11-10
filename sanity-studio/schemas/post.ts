import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }], validation: R => R.required() }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
  ],
});