// components/AuthPage.tsx
'use client';

import { useI18n } from '@/locale/client';
import React from 'react';
import { DivEffect } from '@/lib/motion/effects';
import FormLoginComponent from './form';

export default function AuthPage() {
  const t = useI18n();
  return (
    <React.Fragment>
       <section className="flex md:flex-row h-screen items-center">
      <div className='bg-blue-900 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen'>
        <DivEffect>
          <img src="/logo/icon-meta.png" alt="Icon Home" className='absolute top-5 left-6 opacity-100 z-50' width={140}/>
        </DivEffect>
        <img src="/randon-background.jpg" alt="" className="w-full h-full opacity-50 object-cover" />
      </div>
      <div className='bg-white w-full md:max-w-full lg:max-w-full overflow-y-auto md:mx-auto lg:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center'>
        <div className="w-full h-full pt-24 pt-4 lg:pt-22">
          <DivEffect className='w-full'>
            <React.Fragment>
              <h3 className="text-xl md:text-2xl font-bold  leading-tight mt-1 text-slate-700">Bem vindo ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-600 to-slate-500">META RTC</span></h3>
              <FormLoginComponent/>
            </React.Fragment>
          </DivEffect>
        </div>
      </div>
    </section>
    </React.Fragment>
  );
}
