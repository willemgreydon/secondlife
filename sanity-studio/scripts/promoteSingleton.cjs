const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'igkzac8h',
  dataset: 'production',
  apiVersion: '2025-11-01',
  token: process.env.SANITY_WRITE_TOKEN, // Needed to write; create a temporary Editor token in the dashboard
  useCdn: false,
})

;(async () => {
  // 1) Find the current Home by slug
  const doc = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]`
  )

  if (!doc) {
    console.error('No page with slug "home" found.')
    process.exit(1)
  }

  // 2) Prepare a clean clone with fixed id "home"
  const {_id, _rev, _type, ...rest} = doc
  const clone = {
    _id: 'home',
    _type: 'page',
    ...rest, // includes title, slug, content/contentSections/etc.
  }

  // 3) Upsert the singleton
  await client.createOrReplace(clone)
  console.log('✅ Created/updated singleton page with _id="home".')

  // 4) (Optional) Delete the old UUID document to avoid duplicates
  if (_id !== 'home') {
    await client.delete(_id)
    console.log(`🧹 Deleted old page with _id="${_id}".`)
  }
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
