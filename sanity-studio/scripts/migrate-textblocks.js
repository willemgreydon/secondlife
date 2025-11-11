// sanity-studio/scripts/migrate-textblocks.js
import {createClient} from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Sanity-Client – mit sanity exec benutzen wir --withUserToken (kein Token nötig)
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-11-04',
  useCdn: false,
})

function toBlocks(str) {
  // Absätze an Leerzeile trennen -> je Absatz ein normaler Block
  return String(str)
    .split(/\n{2,}/)
    .map((p) => ({
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', text: p}],
    }))
}

async function run() {
  // Finde alle Docs, die mind. einen textBlock mit string-body enthalten
  const docs = await client.fetch(`*[
    defined(content) && count(content[_type=="textBlock" && !defined(body[0]) && defined(body)]) > 0
  ]{
    _id,
    content[]{ _key, _type, body }
  }`)

  if (!docs.length) {
    console.log('Nothing to migrate.')
    return
  }

  const tx = client.transaction()
  let patchedBlocks = 0

  for (const doc of docs) {
    const setPaths = {}
    for (const sec of doc.content || []) {
      if (sec?._type === 'textBlock' && typeof sec.body === 'string') {
        setPaths[`content[_key=="${sec._key}"].body`] = toBlocks(sec.body)
        patchedBlocks++
      }
    }
    if (Object.keys(setPaths).length) {
      tx.patch(doc._id, (p) => p.set(setPaths))
    }
  }

  if (patchedBlocks === 0) {
    console.log('Nothing to migrate.')
    return
  }

  await tx.commit()
  console.log(`Migrated ${patchedBlocks} textBlock bodies to Portable Text.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
