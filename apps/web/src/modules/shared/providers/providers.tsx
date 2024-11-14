'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { I18nProviderClient } from "@/locale/client";
import { ThemeProvider } from './theme-provider'
import { Toaster } from '@/modules/shared/ui/sonner';


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
          <Toaster position='top-right' visibleToasts={3}   pauseWhenPageIsHidden duration={3600} gap={10}
            toastOptions={{
              closeButton: true,
              classNames: {
                closeButton: "absolute left-80 top-1/2 border-0 close-button dark:hover:opacity-20",
                icon: "mr-4 ml-1",
                description: "text-slate-500 text-xs",
                toast: `dark:bg-gray-800  dark:bg-opacity-60 dark: dark:backdrop-blur-sm dark:border-gray-700 dark:text-gray-400 text-gray-700`
              }
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </I18nProviderClient>
  )
}
