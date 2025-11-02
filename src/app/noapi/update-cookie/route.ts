import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { access_token } = await request.json();

    if (!access_token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    const cookieStore = await cookies();

    // 백엔드와 동일한 옵션으로 쿠키 설정
    cookieStore.set('access_token', access_token, {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to set cookie' },
      { status: 500 },
    );
  }
}
