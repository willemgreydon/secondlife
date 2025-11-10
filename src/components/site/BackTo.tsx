'use client'
import Link from 'next/link'

export default function BackTo({
  href,
  label = '← Back to overview',
  className = '',
}: { href: string; label?: string; className?: string }) {
  return (
    <div className={`container mx-auto px-4 ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
      >
        {label}
      </Link>
    </div>
  )
}
