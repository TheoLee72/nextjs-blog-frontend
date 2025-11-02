'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { postLogin } from '@/lib/client-actions/auth';
export default function LoginPageClient() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // setStatus('idle');
    // setLoading(true);
    setStatus('loading');

    const result = await postLogin(identifier, password);

    if (result.success) {
      router.push('/');
    } else {
      setStatus('error');
      if (result.error?.includes('Login failed')) {
        setErrorMessage('Login failed');
      } else if (result.error?.includes('Next.js')) {
        setErrorMessage('Network error');
      } else {
        setErrorMessage('Internal server error');
      }
    }

    // setLoading(false);
    // setStatus('idle');
  }
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdentifier(value);
    setStatus('idle');
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setStatus('idle');
  };

  return (
    <>
      <div className="font-semibold text-[32px] h-[72px] flex flex-col justify-center">
        Sign in
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[24px] ${status === 'error' ? 'text-red' : 'text-black'}`}
        >
          {status === 'error' ? errorMessage : 'Username or email address'}
        </div>
        <input
          type="text"
          name="identifier"
          onChange={handleIdentifierChange}
          value={identifier}
          disabled={status === 'loading'}
          placeholder="Enter your username or email address"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${status === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[9px] ${status === 'error' ? 'text-red' : 'text-black'}`}
        >
          {status === 'error' ? errorMessage : 'Password'}
        </div>
        <input
          type="password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
          disabled={status === 'loading'}
          placeholder="Enter your password"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${status === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <p className="text-right font-semibold text-[14px] underline mt-[9px]">
          <Link href="/auth/password/forgot-submit">Forgot Your Password</Link>
        </p>
        <div className="border-t w-full border-[1px] border-gray mt-[124px]"></div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full h-[36px] bg-blue rounded-[5px] text-white font-semibold text-[14px] mt-[16px] cursor-pointer"
        >
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </button>
        <div className="w-full text-center justify-start mt-[4px]">
          <span className="text-[14px] text-sm font-normal">
            Don’t have an account?{' '}
          </span>
          <Link href="/register">
            <span className="text-[14px] text-sm font-semibold underline">
              Create your account
            </span>
          </Link>
        </div>
      </form>
    </>
  );
}
