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
    <DivEffect className='w-full h-full'>
      <div className='w-full h-full' style={{
        minWidth: "1000px"
      }}>
        <iframe
            src="/godot-dist/PokemonGodot.html"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            className='rounded-lg'
            title="Godot Game"
        ></iframe>
      </div>
    </DivEffect>
  )
}