// src/components/ui/molecules/Navigation.tsx
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/site/ThemeToggle'


// --------------------------------------------
// NAV STRUCTURE (Contact + ThemeToggle removed)
// --------------------------------------------
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
  const isSectionActive = (children: { href: string; label: string }[]) =>
    children.some((c) => pathname === c.href || pathname.startsWith(c.href + '/'))

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {links.map((item) => {
        if ("children" in item) {
          const key = item.label
          const openNow = openKey === key
          const activeParent = isSectionActive(item.children)

          return (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => open(key)}
              onMouseLeave={closeWithDelay}
              onFocus={() => open(key)}
              onBlur={closeWithDelay}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openNow}
                className={`menu-anchor ${activeParent ? 'active' : ''}`}
                onClick={() => (openNow ? setOpenKey(null) : open(key))}
              >
                {item.label}
              </button>

              {openNow && (
                <div
                  role="menu"
                  aria-label={item.label}
                  className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-popover p-2 shadow-lg backdrop-blur-md"
                  onMouseEnter={() => open(key)}
                  onMouseLeave={closeWithDelay}
                >
                  {item.children.map((c) => {
                    const active = isExactActive(c.href)
                    return (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`menu-anchor block w-full text-left ${active ? 'active' : ''}`}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setOpenKey(null)}
                      >
                        {c.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        }

        const active = isExactActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`menu-anchor ${active ? 'active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}

      {/* Buttons */}
      <Link
        href="/join-us"
        className="ml-2 rounded-full border border-[var(--brand-primary)] bg-transparent px-4 py-1.5 text-sm font-semibold text-[var(--brand-primary)] transition-all hover:bg-[var(--brand-primary)] hover:text-white active:scale-[0.97]"
      >
        Join&nbsp;Us
      </Link>

      <Link
        href="/donate"
        className="ml-2 rounded-full bg-[var(--brand-primary)] px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-primary-dark)] active:scale-[0.97]"
      >
        Donate
      </Link>

      <ThemeToggle />
    </nav>
  )
}