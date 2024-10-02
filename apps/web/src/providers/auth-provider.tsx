'use server';

import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

export async function AuthProvider({ children }: { children: ReactNode }) {

  const token = cookies().get('token');

  if (!token) {
    redirect('/auth');
    return null;
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET as string);
  } catch (error) {
    redirect('/auth');
    return null;
  }
  return <>{children}</>;
}
