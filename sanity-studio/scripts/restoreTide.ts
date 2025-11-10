import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2023-10-01'})

async function run() {
  const doc = {
    _id: 'tide', // <-- fixed singleton id
    _type: 'page',
    title: 'TIDE',
    slug: { _type: 'slug', current: 'tide' },
    contentSections: [],
  }
  const res = await client.createIfNotExists(doc)
  console.log('Created or exists:', res._id)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})