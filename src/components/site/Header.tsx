'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import ThemeToggle from '@/components/site/ThemeToggle'
import Navigation from '@/components/ui/molecules/navigation'

type NavLink = { href: string; label: string }
type NavGroup = { label: string; children: NavLink[] }

function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
  return 'children' in item
}

const NAV_MAIN = [
  {
    href: '/tide', label: 'TIDE'
  },

  // Missions = listing only
  {
    href: '/missions', label: 'Missions',
  },

  // Operations = anchors
  {
    label: 'Operations',
    children: [
      { href: '/operations/beach-cleanups', label: 'Beach Clean-Ups' },
      {
        href: '/operations/revolutionizing-beach-cleanups',
        label: 'Revolutionizing Beach Clean-Ups',
      },
      { href: '/operations/dana-24-valencia', label: 'DANA 24 Valencia' },
    ],
  },

  { href: '/our-team', label: 'Our Team' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/emblem-sl.png" alt="Second Life e.V." width={28} height={28} />
          <span className="font-semibold">Second Life e.V.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden xl:flex flex-1 items-center pl-10">
          <Navigation links={NAV_MAIN} />
        </div>

        {/* Right cluster */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/join-us"
            className="rounded-full border border-[var(--brand-primary)] px-4 py-1.5 text-sm font-semibold text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
          >
            Join Us
          </Link>

          <Link
            href="/donate"
            className="rounded-full bg-[var(--brand-primary)] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[var(--brand-primary-dark)]"
          >
            Donate
          </Link>

          <ThemeToggle />

          <button
            className="xl:hidden rounded p-2 hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="rounded p-2 hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="xl:hidden border-t border-border bg-background">
          <nav className="space-y-2 px-4 py-4">
            {NAV_MAIN.map(item =>
              isNavGroup(item) ? (
                <details key={item.label}>
                  <summary className="menu-anchor">{item.label}</summary>
                  <div className="pl-4">
                    {item.children.map(c => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="menu-anchor block"
                        onClick={() => setOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="menu-anchor block"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
