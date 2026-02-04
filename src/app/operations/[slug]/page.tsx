import { notFound } from "next/navigation"
import PageBuilder from "@/components/site/PageBuilder"
import {
  getPageBySlug,
  getAllOperationPages,
} from "@/lib/queries/page"

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Operations · Dynamic operation page
 * Next.js 16–correct implementation
 */
export default async function Page({ params }: Props) {
  const { slug } = await params

  const page = await getPageBySlug(slug)

  if (!page) return notFound()

  return (
    <PageBuilder
      content={page.content}
      context={{}}
    />
  )
}

/**
 * Static generation for known operation pages
 * GUARANTEED: slug is always a string
 */
export async function generateStaticParams() {
  const pages = await getAllOperationPages()

  return pages.map((p) => ({
    slug: p.slug,
  }))
}

/**
 * Only allow statically known slugs
 */
export const dynamicParams = false
