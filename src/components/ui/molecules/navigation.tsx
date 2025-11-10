'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from '@/components/site/ThemeToggle'

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

export default function Navigation() {
  const [openMissions, setOpenMissions] = useState(false)

  return (
        <nav className="hidden items-center gap-6 md:flex">
          {/*TODO: EXPORT TO NAV COMPONENT*/}
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="relative">
                <button
                  onClick={() => setOpenMissions((s) => !s)}
                  className="rounded px-2 py-1 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </button>
                {openMissions && (
                  <div
                    onMouseLeave={() => setOpenMissions(false)}
                    className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-gray-200 bg-white p-2 shadow-lg
                               dark:border-zinc-800 dark:bg-zinc-900"
                  >

                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:underline"
              >
                {item.label}
              </Link>
            )
          )}

          <Link
            href="/donate"
            className="rounded-full border border-gray-300 px-3 py-1 text-sm font-medium hover:bg-black/5
                       dark:border-gray-600 dark:hover:bg-white/10 transition-colors"
          >
            Donate
          </Link>

          <ThemeToggle />
        </nav>
        
  )
}