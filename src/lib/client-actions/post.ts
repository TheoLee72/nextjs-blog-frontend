'use client';

import { fetchWithAuth } from './refresh';
import { Post } from '../server-actions/post';
export async function putPost(
  content: string,
  title: string,
  postId: number,
): Promise<{ status: string; data?: Post; message?: string }> {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/posts/${postId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, title }),
        credentials: 'include',
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}

export async function postPost(
  content: string,
  title: string,
): Promise<{ status: string; data?: Post; message?: string }> {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/posts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, title }),
        credentials: 'include',
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}

export async function getPost(
  post_id: string,
): Promise<{ status: string; data?: Post; message?: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/posts/${post_id}`,
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error(data.message);
      return data;
    }
  } catch (error) {
    console.error('Next.js error');
    return { status: 'fail', message: 'Next.js error' };
  }
}
