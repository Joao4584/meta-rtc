'use client';

import React from 'react';
import { DivEffect } from '@/lib/motion/effects';

import FormLoginComponent from '../components/form';
import { LinkRedirectRegister } from '../components/link-redirect';

export default function LoginPage() {

  return (
    <DivEffect className='w-full mt-24'>
      <React.Fragment>
        <h3 className="text-xl md:text-2xl font-bold  leading-tight mt-1 text-slate-700 dark:text-slate-200">
            Bem vindo ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-600 to-slate-500">META RTC</span>
        </h3>
        <FormLoginComponent/>
        <LinkRedirectRegister />
      </React.Fragment>
    </DivEffect>
  )
}