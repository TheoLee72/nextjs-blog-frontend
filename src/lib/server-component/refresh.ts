import { cookies } from 'next/headers';

let refreshPromise: Promise<Map<string, string>> | null = null;

async function postRefreshToken(): Promise<Map<string, string>> {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.INTERNAL_BACKEND_URL}/auth/refresh`,
    {
      method: 'POST',
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  if (!response.ok) {
    throw new Error('Refresh failed');
  }

  const setCookies = response.headers.getSetCookie();
  const updatedCookies = new Map<string, string>();

  for (const setCookie of setCookies) {
    const [cookieName, rest] = setCookie.split('=');
    const cookieValue = rest.split(';')[0].trim();

    updatedCookies.set(cookieName.trim(), cookieValue);
  }

  return updatedCookies;
}

// 자동 재시도 로직
export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  let response = await fetch(input, init);
  let updatedCookies: Map<string, string> | null = null;

  if (response.status === 401) {
    if (!refreshPromise) {
      refreshPromise = postRefreshToken()
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    try {
      updatedCookies = await refreshPromise;

      if (updatedCookies && updatedCookies.size > 0) {
        const cookieStore = await cookies();
        const currentCookies = cookieStore.getAll();

        const cookieMap = new Map<string, string>();

        // 기존 쿠키 추가
        currentCookies.forEach((cookie) => {
          cookieMap.set(cookie.name, cookie.value);
        });

        // 새 쿠키 덮어쓰기
        updatedCookies.forEach((value, name) => {
          cookieMap.set(name, value);
        });

        // Cookie 헤더 문자열 생성
        const cookieString = Array.from(cookieMap.entries())
          .map(([name, value]) => `${name}=${value}`)
          .join('; ');

        const headers = new Headers(init?.headers);
        headers.set('Cookie', cookieString);

        response = await fetch(input, {
          ...init,
          headers,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  const cookiejson = Object.fromEntries(updatedCookies ?? []);
  const data = await response.json();

  return { ...data, ...cookiejson };
}
