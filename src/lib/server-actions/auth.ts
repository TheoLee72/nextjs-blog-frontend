'use server';

import { cookies } from 'next/headers';

export async function forceLogout() {
  const cookieStore = await cookies();
  cookieStore.set('access_token', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0,
  });

  cookieStore.set('refresh_token', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0,
  });
}

export async function roughCheckLogin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');
  return !!token;
}

export async function postForgotPassword(identifier: string): Promise<{
  status: 'success' | 'fail';
  message: string;
}> {
  try {
    const response = await fetch(
      `${process.env.INTERNAL_BACKEND_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier }),
      },
    );
    const data = await response.json();
    return data; //어짜피 status, message 담겨서 옮.
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}
