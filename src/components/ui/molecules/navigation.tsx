'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ThemeToggle from '@/components/site/ThemeToggle'

// --------------------------------------------
// Navigation structure (with nested submenus)
// --------------------------------------------
type NavItem =
  | { href: string; label: string }
  | { label: string; children: { href: string; label: string }[] }

const NAV: NavItem[] = [
  { href: '/tide', label: 'TIDE' },
  {
    label: 'Missions',
    children: [
      { href: '/missions', label: 'Current Missions' },
      { href: '/missions/beach-cleanups', label: 'Beach Clean-Ups' },
      { href: '/missions/dana-24-vlc', label: 'DANA 24 VLC' },
      { href: '/missions/revolutionizing-beach-clean-ups', label: 'Revolutionizing Beach Clean-Ups' },
    ],
  },
  { href: '/operations', label: 'Operations' },
  {
    label: 'Organisation',
    children: [
      { href: '/events', label: 'Events' },
      { href: '/blog', label: 'Blog' },
      { href: '/our-team', label: 'Our Team' },
      { href: '/campaigns', label: 'Campaigns' },
      { href: '/initiatives', label: 'Initiatives' },
      { href: '/partners', label: 'Partners' },
    ],
  },
  { href: '/join-us', label: 'Join Us' },
  { href: '/contact', label: 'Contact' },
]

// --------------------------------------------
// Navigation component
// --------------------------------------------
export default function Navigation() {
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

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {NAV.map((item) => {
        if ('children' in item) {
          const key = item.label
          const isOpen = openKey === key

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
                aria-expanded={isOpen}
                className={[
                  'rounded px-2 py-1 text-sm font-medium transition-colors duration-150',
                  isOpen
                    ? 'text-[var(--color-primary)]'
                    : 'hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10',
                ].join(' ')}
                onClick={() => (isOpen ? setOpenKey(null) : open(key))}
              >
                {item.label}
              </button>

              {isOpen && (
                <div
                  role="menu"
                  aria-label={item.label}
                  className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-popover p-2 shadow-lg backdrop-blur-md"
                  onMouseEnter={() => open(key)}
                  onMouseLeave={closeWithDelay}
                >
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
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
            className="text-sm font-medium transition-colors duration-150 hover:text-[var(--color-primary)] hover:underline underline-offset-4"
          >
            {item.label}
          </Link>
        )
      })}

      <Link
        href="/donate"
        className="rounded-full border border-[var(--color-primary)] px-3 py-1 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
      >
        Donate
      </Link>

      <ThemeToggle />
    </nav>
  )
}
