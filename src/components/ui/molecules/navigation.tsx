// src/components/ui/molecules/navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from '@/components/site/ThemeToggle'

/* --------------------------------
   EXPORTED NAV TYPES
--------------------------------- */

export type NavLink = {
  type: 'link'
  href: string
  label: string
}

export type NavGroup = {
  type: 'group'
  label: string
  children: { href: string; label: string }[]
}

export type NavItem = NavLink | NavGroup

/* --------------------------------
   COMPONENT
--------------------------------- */

export default function Navigation({ links }: { links: NavItem[] }) {
  const pathname = usePathname()
  const [openKey, setOpenKey] = useState<string | null>(null)

  const isActive = (href: string) => pathname === href
  const isGroupActive = (children: NavGroup['children']) =>
    children.some(c => pathname === c.href || pathname.startsWith(c.href + '/'))

  return (
    <nav className="flex items-center gap-6">
      {links.map(item => {
        if (item.type === 'group') {
          const open = openKey === item.label

          return (
            <div key={item.label} className="relative">
              <button
                className={`menu-anchor ${isGroupActive(item.children) ? 'active' : ''}`}
                onClick={() => setOpenKey(open ? null : item.label)}
              >
                {item.label}
              </button>

              {open && (
                <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-popover p-2 shadow-lg">
                  {item.children.map(c => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className={`menu-anchor block ${isActive(c.href) ? 'active' : ''}`}
                      onClick={() => setOpenKey(null)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`menu-anchor ${isActive(item.href) ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        )
      })}

      <Link
        href="/join-us"
        className="ml-2 rounded-full border border-[var(--brand-primary)] px-4 py-1.5 text-sm font-semibold text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
      >
        Join&nbsp;Us
      </Link>

      <Link
        href="/donate"
        className="ml-2 rounded-full bg-[var(--brand-primary)] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[var(--brand-primary-dark)]"
      >
        Donate
      </Link>

      <ThemeToggle />
    </nav>
  )
}
