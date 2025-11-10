'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import ThemeToggle from '@/components/site/ThemeToggle'
import Navigation from '@/components/ui/molecules/navigation'

//TODO: export to NAV Component
const NAV = [
  { href: '/tide', label: 'TIDE' },
  {
    label: 'Missions',
    children: [
      { href: '/missions', label: 'Current Missions' },
      { href: '/missions/beach-cleanups', label: 'Beach Clean-Ups' },
      { href: '/missions/dana-24-vlc', label: 'DANA 24 VLC' },
      { href: '/missions/revolutionizing-beach-cleanups', label: 'Revolutionizing Beach Clean-Ups' },
    ],
  },
  { href: '/operations', label: 'Operations' },
  { href: '/our-team', label: 'Our Team' },
  { href: '/join-us', label: 'Join Us' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [openMissions, setOpenMissions] = useState(false) // kept for parity with your original

  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/80
                 backdrop-blur supports-[backdrop-filter]:bg-white/60
                 dark:border-zinc-800 dark:bg-zinc-900/70 dark:supports-[backdrop-filter]:bg-zinc-900/60
                 transition-colors"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: emblem + wordmark (clickable) */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90">
          <Image
            src="/emblem-sl.png"
            alt="Second Life e.V."
            width={28}
            height={28}
            priority
            className="shrink-0 rounded-sm"
          />
          <span className="text-base font-semibold">Second Life e.V.</span>
        </Link>

        {/* Desktop nav */}
        <Navigation links={NAV} />

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="block h-0.5 w-5 bg-black dark:bg-white" />
          <span className="mt-1 block h-0.5 w-5 bg-black dark:bg-white" />
          <span className="mt-1 block h-0.5 w-5 bg-black dark:bg-white" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 transition-colors">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="space-y-2">
              {NAV.map((item) =>
                item.children ? (
                  <details key={item.label}>
                    <summary className="cursor-pointer list-none rounded px-2 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10">
                      {item.label}
                    </summary>
                    <div className="mt-1 space-y-1 pl-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block rounded px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
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
                    className="block rounded px-2 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="mt-2">
                <ThemeToggle />
              </div>
              <Link
                href="/donate"
                className="mt-3 inline-block rounded-full border border-gray-300 px-3 py-1 text-sm font-medium hover:bg-black/5 dark:border-gray-600 dark:hover:bg-white/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                Donate
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
