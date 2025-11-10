import PageBuilder from '@/components/site/PageBuilder'
import { sanityClient } from '@/lib/sanity.client'
import { blogListQuery } from '@/lib/sanity.queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogIndexPage() {
  const posts = await sanityClient.fetch(blogListQuery).catch(() => [])

  const content = [
    {
      _type: 'richTextSection',
      _key: 'blog-index-intro',
      title: 'Blog',
      body: [
        { _type: 'block', children: [{ _type: 'span', text: 'Stories, updates & deep dives.' }] },
      ],
    },
    {
      _type: 'textBlock',
      _key: 'blog-index-list',
      title: 'All Posts',
      body: posts.map((p: any) => ({
        _type: 'block',
        children: [
          { _type: 'span', text: p.title },
          { _type: 'span', text: '  ' },
          { _type: 'link', href: `/blog/${p.slug}`, text: 'Read →' },
        ],
      })),
    },
  ]

  return (
    <main className="min-h-screen">
      <PageBuilder content={content} />
    </main>
  )
}
