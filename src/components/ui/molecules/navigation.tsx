'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from '@/components/site/ThemeToggle'

type NavChild = { href: string; label: string }
type NavItem =
  | { label: string; href: string; exact?: boolean }
  | { label: string; children: NavChild[]; key: 'mission' | 'organisation' }

const NAV: NavItem[] = [
  { href: '/tide', label: 'TIDE' },
  {
    key: 'mission',
    label: 'Mission',
    children: [
      { href: '/missions', label: 'Current Missions' },
      { href: '/missions/beach-cleanups', label: 'Beach Clean-Ups' },
      { href: '/missions/dana-24-vlc', label: 'DANA 24 VLC' },
      { href: '/missions/revolutionizing-beach-cleanups', label: 'Revolutionizing Beach Clean-Ups' },
    ],
  },
  { href: '/operations', label: 'Operations' },
  {
    key: 'organisation',
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
  { href: '/join-us', label: 'Join us' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const pathname = usePathname() || '/'
  const [openKey, setOpenKey] = useState<null | 'mission' | 'organisation'>(null)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const base =
    'rounded px-2 py-1 text-sm font-medium transition-all duration-200 relative ' +
    'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--brand-primary)] ' +
    'hover:after:w-full after:transition-all after:duration-300'
  const inactive = 'text-foreground/80'
  const active = 'text-[var(--brand-primary)] bg-[var(--brand-primary-tint)]'

  return (
    <nav className="hidden items-center gap-2 md:flex">
      {NAV.map((item) => {
        if ('children' in item) {
          const open = openKey === item.key
          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenKey(item.key)}
              onMouseLeave={() => setOpenKey(null)}
            >
              <button
                onClick={() => setOpenKey(open ? null : item.key)}
                className={`${base} ${open ? active : inactive}`}
                aria-haspopup="menu"
                aria-expanded={open}
              >
                {item.label}
              </button>

              {open && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-gray-200 p-2 shadow-2xl
                             backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 dark:border-zinc-800 transition-all duration-200"
                >
                  {item.children.map((c) => {
                    const a = isActive(c.href)
                    return (
                      <Link
                        key={c.href}
                        href={c.href}
                        role="menuitem"
                        onClick={() => setOpenKey(null)}
                        className={`block rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:text-[var(--brand-primary)] ${
                          a ? active : inactive
                        }`}
                        aria-current={a ? 'page' : undefined}
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

        const a = isActive(item.href, item.exact)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${base} ${a ? active : inactive}`}
            aria-current={a ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}

      <Link
        href="/donate"
        className="rounded-full border px-3 py-1 text-sm font-medium transition-all duration-200
                   border-[color:var(--brand-primary)] text-[var(--brand-primary)]
                   hover:bg-[var(--brand-primary-tint)]"
      >
        Donate
      </Link>

      <ThemeToggle />
    </nav>
  )
}
