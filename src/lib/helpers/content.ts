// src/lib/helpers/content.ts
export function normalizeContent(page: any) {
  return page?.content?.length
    ? page.content
    : page?.contentSections?.length
    ? page.contentSections
    : page?.sections?.length
    ? page.sections
    : [];
}
