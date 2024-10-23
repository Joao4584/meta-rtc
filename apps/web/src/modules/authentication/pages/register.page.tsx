'use client';

import React from 'react';
import { DivEffect } from '@/lib/motion/effects';
import FormRegisterComponent from '../components/formRegister';

export default function RegisterPage() {

  return (
    <DivEffect className='w-full mt-8'>
      <React.Fragment>
        <h3 className="text-xl md:text-2xl font-extrabold leading-tight mt-1 text-slate-600">
          Junte-se à <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-400">META RTC</span>
        </h3>
        <p className="mt-2 text-slate-600 text-sm pl-1">
          Crie sua conta e explore novas maneiras de se conectar, colaborar e compartilhar em tempo real.
        </p>
        <FormRegisterComponent />
      </React.Fragment>
    </DivEffect>
  );
}
