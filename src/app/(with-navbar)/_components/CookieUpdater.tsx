// components/CookieUpdater.tsx
'use client';

import { useEffect } from 'react';

interface CookieUpdaterProps {
  newAccessToken?: string | null;
}

export default function CookieUpdater({ newAccessToken }: CookieUpdaterProps) {
  useEffect(() => {
    if (newAccessToken) {
      // API Route를 통해 쿠키 설정
      fetch('/noapi/update-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: newAccessToken }),
      }).catch(console.error);
    }
  }, [newAccessToken]);

  return null; // UI 렌더링 없음
}
