'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const current = mounted ? (theme === 'system' ? resolvedTheme : theme) : 'system'
  const next = current === 'dark' ? 'light' : 'dark'

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle dark mode"
        onClick={() => setTheme(next!)}
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm
                   hover:bg-black/5 dark:hover:bg-white/10"
      >
        {/* simple dot icon that inverts */}
        <span className="h-3.5 w-3.5 rounded-full bg-zinc-900 dark:hidden" />
        <span className="hidden h-3.5 w-3.5 rounded-full bg-yellow-300 dark:inline-block" />
        {current === 'dark' ? 'Light' : 'Dark'}
      </button>

      <button
        aria-label="Use system theme"
        onClick={() => setTheme('system')}
        className="rounded-full border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
      >
        System
      </button>
    </div>
  )
}