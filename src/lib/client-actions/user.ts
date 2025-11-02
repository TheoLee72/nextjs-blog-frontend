'use client';
import { fetchWithAuth } from './refresh';
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getMe(): Promise<{
  status: 'success' | 'fail';
  message?: string;
  data?: { user: User; post_count: number; comment_count: number };
}> {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/users/me`,
      {
        credentials: 'include',
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}

export async function putUsername(name: string) {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/users/username`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
        credentials: 'include',
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}

export async function putEmail(email: string) {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/users/email`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}

export async function putPassword(
  new_password: string,
  new_password_confirm: string,
  old_password: string,
) {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/users/password`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password,
          new_password_confirm,
          old_password,
        }),
        credentials: 'include',
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}
