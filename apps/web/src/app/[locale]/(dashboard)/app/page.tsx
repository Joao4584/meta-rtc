'use client';

import { useI18n } from '@/locale/client';
import { useEffect } from 'react';
// import { getI18n } from '@/locale/server';

export default function Test() {
  const t = useI18n();


  return (
    <div className="">aaaaa
      {t('languages.en')}
    </div>
  );
}
