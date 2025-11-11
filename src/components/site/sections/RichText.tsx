'use client'
import { PortableText } from '@portabletext/react'
export default function RichText({ title, body }: { title?:string; body?:any[] }) {
  if (!title && !body?.length) return null
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      {title && <h2 className="mb-4 text-2xl font-semibold">{title}</h2>}
      {body?.length ? <PortableText value={body} /> : null}
    </section>
  )
}
