'use client';
import { getEmailVerification } from '@/lib/client-actions/auth';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function EmailConfirmPage() {
  const params = useParams<{ token: string }>();
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  useEffect(() => {
    const fetchVerify = async () => {
      const data = await getEmailVerification(params.token);
      setStatus(data.status);
    };
    fetchVerify();
  }, [params.token]);
  const token = decodeURIComponent(params.token);
  return (
    <>
      <div className="font-semibold text-[32px] h-[72px] flex flex-col justify-center">
        {status === 'idle'
          ? 'Checking...'
          : status === 'success'
            ? 'Email confirmed'
            : 'Invalid or Expired'}
      </div>
      <div className="font-semibold text-[14px] h-[195px] flex flex-col justify-start mt-[24px] leading-loose">
        {status === 'success' &&
          (token.includes('+') ? (
            <Link href="/profile">
              <div className="font-semibold text-[14px] h-[24px] flex flex-col justify-center underline">
                Profile
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <div className="font-semibold text-[14px] h-[24px] flex flex-col justify-center underline">
                Login
              </div>
            </Link>
          ))}
      </div>
      <div className="border-t w-full border-[1px] border-gray mt-[16px]"></div>
      {status === 'fail' && !token.includes('+') && (
        <p className="w-full mt-[16px] text-[14px] leading-none">
          Email verification has failed. Please try signing up again in 24
          hours.
        </p>
      )}
    </>
  );
}
