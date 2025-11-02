'use client';
import { postEmail } from '@/lib/server-actions/newsletter';
import { useState, FormEvent, useRef, useEffect } from 'react';

export default function NewsletterClientPage() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'error') {
      inputRef.current?.focus();
    }
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.includes('@')) {
      setStatus('error');
      setErrorMessage('Invalid email address');
      return;
    }
    setStatus('loading');

    const result = await postEmail(email);
    if (result.status === 'success') {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      if (result.message === 'Email already exists.') {
        setErrorMessage('Email already exists.');
      } else if (result.message.includes('Validation error')) {
        setErrorMessage('Invalid email address');
      } else if (result.message.includes('Next.js')) {
        setErrorMessage('Network error');
      } else {
        setErrorMessage('Internal server error');
      }
    }
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setStatus('idle');
  };

  return (
    <>
      <div className="w-full h-[74px]"></div>
      <p className="font-serif text-[18px]">
        Get the latest tech trends, tips, and insights straight to your inbox.
      </p>
      <p className="font-serif text-[18px] mt-[10px]">
        Join my newsletter and stay ahead of the curve—no fluff, just the good
        stuff.
      </p>
      <div
        className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[9px] ${status === 'success' ? 'text-blue' : status === 'error' ? 'text-red' : 'text-black'}`}
      >
        {status === 'success'
          ? "You've been signed up for the newsletter list."
          : status === 'error'
            ? errorMessage
            : 'Email address'}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-row gap-x-[7px] justify-between"
      >
        <input
          type="text"
          name="email"
          onChange={handleEmailChange}
          value={email}
          placeholder="Enter your email address"
          disabled={status === 'loading'}
          ref={inputRef}
          className={`flex-1 focus:outline-none px-[13px] h-[36px] items-center border-[1px] rounded-[5px] font-semibold text-[14px] ${status === 'success' ? 'border-blue bg-white' : status === 'error' ? 'border-red bg-white' : 'border-gray bg-[#F7F4ED]'}`}
        ></input>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-[clamp(81px,calc((100%-7px)*1/7),200px)] flex justify-center bg-blue h-[36px] items-center rounded-[5px] font-semibold text-white text-[14px]"
        >
          {status === 'loading' ? 'Loading' : 'Sign Up'}
        </button>
      </form>
    </>
  );
}
