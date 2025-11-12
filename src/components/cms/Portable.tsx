'use client'
import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mb-4 text-3xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 text-2xl font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc pl-5">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal pl-5">{children}</ol>,
  },
}

export default function Portable({ value }: { value: any[] }) {
  return <PortableText value={value ?? []} components={components} />
}
