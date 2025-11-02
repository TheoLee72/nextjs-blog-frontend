'use client';
let refreshPromise: Promise<void> | null = null;

async function postRefreshToken() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/auth/refresh`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Refresh failed');
  }
}

// 자동 재시도가 필요한 경우
export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  let response = await fetch(input, init);

  if (response.status === 401) {
    if (!refreshPromise) {
      refreshPromise = postRefreshToken().finally(() => {
        refreshPromise = null; //refresh 실패하면 바로 caller한테 error 전파, 보통은 Nextjs error로 들어가는듯.
      });
    }
    await refreshPromise;

    response = await fetch(input, init);
  }

  return response;
}
