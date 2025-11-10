'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'
  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="menu-anchor p-2 rounded-full inline-flex items-center justify-center"
    >
      {/* simple cross-fade */}
      <span className="relative h-5 w-5">
        <Sun
          className={`absolute inset-0 h-5 w-5 transition-opacity duration-200 ${isDark ? 'opacity-0' : 'opacity-100'}`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 transition-opacity duration-200 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        />
      </span>
    </button>
  )
}
