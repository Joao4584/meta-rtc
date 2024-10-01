'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { I18nProviderClient } from "@/locale/client";
import { ThemeProvider } from './theme-provider'


type ProviderProps = {
  locale: string;
  children: ReactNode;
};

export function Providers({ locale, children }: ProviderProps) {
  const [queryClient] = useState(
    () => new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false },
        },
    }),
  )

  return (
    
    <I18nProviderClient locale={locale}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </QueryClientProvider>

    </I18nProviderClient>
  )
}
