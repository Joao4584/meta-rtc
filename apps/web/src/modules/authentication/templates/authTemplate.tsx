'use client';

import React, { useEffect } from 'react';
import { DivEffect } from '@/lib/motion/effects';

import type { ChildrenProps } from '@/modules/shared/types/children';
import { useTheme } from 'next-themes';

export default function AuthTemplate({ children } : ChildrenProps) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark"); 
  }, [setTheme]);

  return (
    <React.Fragment>
       <section className="flex md:flex-row h-screen items-center">
      <div className='bg-blue-900 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen'>
        <DivEffect>
          <img src="/logo/icon-meta.png" alt="Icon Home" className='absolute top-5 left-6 opacity-100 z-50' width={140}/>
        </DivEffect>
        <img src="/randon-background.jpg" alt="" className="w-full h-full opacity-50 object-cover" />
      </div>
      <div className='bg-white dark:bg-slate-700 w-full md:max-w-full lg:max-w-full overflow-y-auto md:mx-auto lg:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center'>
        <div className="w-full h-full pt-4 lg:pt-22">
          { children }
        </div>
      </div>
    </section>
    </React.Fragment>
  );
}
