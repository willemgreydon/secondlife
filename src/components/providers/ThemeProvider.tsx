'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export default function ThemeProvider(props: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"      // adds "dark" or nothing on <html>
      defaultTheme="system"  // 'light' | 'dark' | 'system'
      enableSystem
      disableTransitionOnChange
      {...props}
    />
  )
}