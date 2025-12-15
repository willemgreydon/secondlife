'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

type NavItem =
  | { href: string; label: string }
  | { label: string; children: { href: string; label: string }[] }

interface NavigationProps {
  links: NavItem[]
}

export default function Navigation({ links }: NavigationProps) {
  const pathname = usePathname()
  const [openKey, setOpenKey] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)

  const open = (key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpenKey(key)
  }

  const closeWithDelay = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenKey(null), 150)
  }

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKey(null)
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  const isExactActive = (href: string) => pathname === href
  const isChildActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')
  const isGroupActive = (children: { href: string; label: string }[]) =>
    children.some(c => isChildActive(c.href))

  return (
    <nav className="flex items-center gap-6">
      {links.map(item => {
        if ('children' in item) {
          const openNow = openKey === item.label
          const activeParent = isGroupActive(item.children)

          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => open(item.label)}
              onMouseLeave={closeWithDelay}
            >
              <button
                type="button"
                className={`menu-anchor ${activeParent ? 'active' : ''}`}
                aria-expanded={openNow}
              >
                {item.label}
              </button>

              {openNow && (
                <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-popover p-2 shadow-lg">
                  {item.children.map(c => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className={`menu-anchor block ${
                        isChildActive(c.href) ? 'active' : ''
                      }`}
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
            className={`menu-anchor ${
              isExactActive(item.href) ? 'active' : ''
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
