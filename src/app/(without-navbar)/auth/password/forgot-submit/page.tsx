'use client';
import { postForgotPassword } from '@/lib/server-actions/auth';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function ForgotPasswordPageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const identifier = formData.get('identifier') as string;
    await postForgotPassword(identifier);
    setLoading(false);
    router.push(`/auth/password/forgot-request/${identifier}`);
  }
  return (
    <>
      <div className="font-semibold text-[32px] h-[72px] flex flex-col justify-center">
        Forgot password
      </div>
      <form onSubmit={handleSubmit}>
        <div className="font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[24px]">
          Username or email address
        </div>
        <input
          type="text"
          name="identifier"
          disabled={loading}
          placeholder="Enter your username or email address"
          className="focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm"
        ></input>
        <div className="border-t w-full border-[1px] border-gray mt-[223px]"></div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[36px] bg-blue rounded-[5px] text-white font-semibold text-[14px] mt-[16px] cursor-pointer"
        >
          Reset password
        </button>
      </form>
    </>
  );
}
