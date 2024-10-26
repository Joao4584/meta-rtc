'use client';

import React, { useEffect } from 'react';
import { DivEffect } from '@/lib/motion/effects';
import useSidebarStore from '@/modules/shared/store/useSidebar.store';


export default function Sprint() {
  const { setSidebarMinimized } = useSidebarStore();

  useEffect(() => {
    setSidebarMinimized(true);

    return () => {
      setSidebarMinimized(false);
    };
  }, []);

  return (
    <DivEffect className='w-full '>
      <div>
        Pagina Sprint
      </div>
    </DivEffect>
  )
}