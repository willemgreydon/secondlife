// sanity-studio/scripts/listPages.cjs
const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'igkzac8h',
  dataset: 'production',
  apiVersion: '2025-11-01',
  useCdn: false,
})

;(async () => {
  const pages = await client.fetch(`*[_type == "page"]{_id, title, "slug": slug.current}`)
  console.log(JSON.stringify(pages, null, 2))
})().catch((err) => {
  console.error(err)
  process.exit(1)
})