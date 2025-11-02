'use client';
import { fetchWithAuth } from './refresh';
export async function postLogin(
  identifier: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
        credentials: 'include', //받을 때도 필요.
      },
    );
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('username', data.username);
      return { success: true };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: 'Next.js error' };
  }
}

export async function postRegister(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
        credentials: 'include', //받을 때도 필요.
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}

export async function postLogout(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/users/logout`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (response.ok) {
      localStorage.removeItem('username');
      return { success: true };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message,
      };
    }
  } catch (error) {
    console.error(error); //refresh fail.
    return {
      success: false,
      error: 'Next.js error',
    };
  }
}

export async function getEmailVerification(token: string): Promise<{
  status: 'success' | 'fail';
  message: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/auth/verify?token=${token}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}

export async function postResetPassword(
  token: string,
  new_password: string,
  new_password_confirm: string,
): Promise<{ status: 'success' | 'fail'; message: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, new_password, new_password_confirm }),
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}
