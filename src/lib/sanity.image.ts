import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.client'

export type AnyImage =
  | string
  | { asset?: { _ref?: string; url?: string } | null }
  | null
  | undefined

const builder = imageUrlBuilder(sanityClient)

export function getImageUrl(
  img: AnyImage,
  opts?: { width?: number; height?: number; fit?: 'clip'|'crop'|'fill'|'fillmax'|'max'|'scale'; autoFormat?: boolean }
): string | null {
  if (!img) return null
  if (typeof img === 'string') return img || null
  const asset = img.asset
  if (!asset) return null
  if ('url' in asset && asset.url) return asset.url || null
  if ('_ref' in asset && asset._ref) {
    let q = builder.image(img)
    if (opts?.width) q = q.width(opts.width)
    if (opts?.height) q = q.height(opts.height)
    if (opts?.fit) q = q.fit(opts.fit)
    if (opts?.autoFormat !== false) q = q.auto('format')
    return q.url()
  }
  return null
}
