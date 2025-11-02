import { cookies } from 'next/headers';
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
  access_token?: string;
  status: 'success' | 'fail';
  message?: string;
  data?: { user: User; post_count: number; comment_count: number };
}> {
  try {
    const cookieStore = await cookies();
    const response = await fetchWithAuth(
      `${process.env.INTERNAL_BACKEND_URL}/users/me`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );
    //console.log(response);
    return response;
  } catch (error) {
    return { status: 'fail', message: 'Next.js error' };
  }
}
