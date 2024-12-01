'use server';

import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { loadEnv } from '@project/env';

export async function AuthProvider({ children }: { children: ReactNode }) {
  loadEnv()
  const token = cookies().get('session-token');

  if (!token) {
    redirect('/auth');
    return null;
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET_KEY as string);
  } catch (error) {
    redirect('/auth');
    return null;
  }
  return <>{children}</>;
}
