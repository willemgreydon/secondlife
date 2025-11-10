'use client'

import { ReactNode } from 'react'

export default function Container({
  children,
  size = 'lg',
  className = '',
}: {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}) {
  const maxW =
    size === 'sm'
      ? 'max-w-3xl'
      : size === 'md'
      ? 'max-w-5xl'
      : size === 'xl'
      ? 'max-w-7xl'
      : size === 'full'
      ? 'max-w-none'
      : 'max-w-6xl'

  return (
    <div
      className={`mx-auto ${maxW} px-6 ${className}
                  bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors`}
    >
      {children}
    </div>
  )
}