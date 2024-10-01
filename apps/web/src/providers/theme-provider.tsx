'use client'

import { ReactNode } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={['light', 'dark']}
      enableSystem={false}
    >
      {children}
    </NextThemeProvider>
  )
}
